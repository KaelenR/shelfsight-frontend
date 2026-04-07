/**
 * // ARCH DECISION: Minimal server not-found page so prerender does not pull
 * client-only context paths that break `next build` in CI (Task 5 build gate).
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 p-8">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground text-sm">The page you requested does not exist.</p>
    </div>
  );
}
