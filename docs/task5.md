# Task 5 — Frontend CI

GitHub Actions workflow `.github/workflows/ci.yml` runs:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build:ci` — `next build --experimental-build-mode compile`

See backend repo `docs/task5/README.md` for full Task 5 documentation (load testing, scalability, CloudWatch).
