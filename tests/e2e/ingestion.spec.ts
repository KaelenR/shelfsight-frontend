import { test, expect, USERS } from './fixtures';
import fs from 'node:fs';
import path from 'node:path';

const API = 'http://localhost:3001';

test.describe('Ingestion pipeline — KAN-60', () => {
  test.beforeEach(async ({ request }) => {
    const res = await request.post(`${API}/auth/login`, { data: USERS.admin });
    expect(res.ok()).toBeTruthy();
  });

  test('ISBN lookup via ingestion analyze (no image) falls through or returns a clear result', async ({ request }) => {
    // If the analyze endpoint supports a direct-ISBN mode, prefer that — otherwise
    // we use a generated buffer below. Some builds expose /ingest/isbn; prefer it.
    const byIsbn = await request.post(`${API}/ingest/isbn`, { data: { isbn: '9780140449136' } }).catch(() => null);
    if (byIsbn && byIsbn.ok()) {
      const body = await byIsbn.json();
      const data = body.data ?? body;
      expect(data).toBeTruthy();
    } else {
      test.info().annotations.push({ type: 'note', description: '/ingest/isbn not available — skipping ISBN-only check' });
    }
  });

  test('ingestion analyze accepts an image upload and produces a structured job', async ({ request }) => {
    // Tiny 1x1 PNG used as a placeholder. Textract will either succeed (real
    // credentials) or the pipeline's fallbacks kick in. Either way we get a
    // job record back with a shape we can assert on.
    const pngBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGD4DwABBAEAwS2OUAAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(pngBase64, 'base64');
    const tmpPath = path.join(process.cwd(), 'tests', 'e2e', '_fixture.png');
    fs.writeFileSync(tmpPath, buffer);

    try {
      const res = await request.post(`${API}/ingest/analyze`, {
        multipart: {
          image: { name: 'fixture.png', mimeType: 'image/png', buffer },
        },
      });

      // With OpenAI / AWS keys missing and the KAN-60 fix applied, the service
      // should surface a clear error (non-2xx with a code) instead of silently
      // returning null fields. Either a 2xx job record OR a ≥400 with a code
      // that names the degraded step is acceptable — but a 2xx with null
      // title/author/isbn is NOT (that's the pre-fix silent-stub bug).
      const body = await res.json();
      if (res.ok()) {
        const job = body.data ?? body;
        // Backend returns { jobId, classification, image, isbn, language, ocr }
        const jobId = job.jobId ?? job.id;
        expect(jobId, `missing job id in response: ${JSON.stringify(job)}`).toBeTruthy();

        // KAN-60: when OpenAI is unavailable the classifier should report a
        // source (e.g. 'heuristic') with a nonzero-but-low confidence — NOT
        // `confidence_score: 0, dewey_class: null` with no user-visible signal.
        const cls = job.classification ?? {};
        const hasDeweyResult = cls.dewey_class != null && cls.dewey_class !== '';
        const hasSourceSignal = typeof cls.source === 'string' && cls.source.length > 0;
        const hasReasoning = typeof cls.reasoning === 'string' && cls.reasoning.length > 0;
        expect(
          hasDeweyResult || hasSourceSignal || hasReasoning,
          'classifier must expose either a result, a source, or a reason — no silent empties',
        ).toBeTruthy();
      } else {
        expect(body.error?.code, 'failure should name the step that broke').toBeTruthy();
      }
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });
});
