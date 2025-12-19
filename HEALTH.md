# Repository Health Audit

**Overall score:** 68/100 — Static documentation hub with minimal build/test coverage now wired into CI. Core hygiene files exist, but automated security/release/deploy practices are light.

**Subscores**
- CI/Build Reproducibility (25): 20 — Node 20 pinned; lint/test/build scripted; CI caches npm and runs on push/PR. No scheduled runs or matrix coverage.
- Tests/Quality Gates (20): 12 — Smoke test validates landing page and links; lint covers whitespace/title checks. No deeper content validation or regression tests.
- Security Baseline (20): 13 — SECURITY.md present and CI permissions narrowed to read; proprietary license documented. Missing secret/dependency scanning and SBOM generation.
- Release/Packaging (15): 9 — Build script produces static `dist/`, but no automated publish/release cadence or changelog/tagging.
- Documentation/Onboarding (10): 8 — README now documents golden commands and local serving; CONTRIBUTING and CODE_OF_CONDUCT present.
- Ops/Runbooks/Observability (10): 6 — Static site only; no deploy/runbook, monitoring, or uptime checks noted.

## P0 blockers
- None identified after adding build/test scripts, CI coverage, and baseline governance files.

## P1 risks
- No automated dependency or secret scanning (e.g., Dependabot, secret scanning, npm audit) to catch supply-chain issues early.
- Docs build relies on external OpenAPI URL without availability guardrails; no caching or checksum verification.
- No automated deployment pipeline or changelog/versioning for published docs.
- Typechecking is a placeholder; no schema/HTML validation beyond the smoke test.

## P2 hygiene
- Add link/HTML validation and accessibility checks to improve doc quality.
- Add scheduled CI runs to surface drift and external link rot.
- Consider a static site generator or templating to simplify future expansion and theming.
- Expand `.gitignore`/tooling as new build artifacts emerge (e.g., screenshots, coverage reports).

## CI status
- **Node CI** (`.github/workflows/node-ci.yml`): runs on push/PR to `main`; installs dependencies with npm, then runs lint → typecheck (placeholder) → test (smoke) → build.
- **Build Docs** (`.github/workflows/docs-ci.yml`): runs on push to `main`; installs dependencies, builds `dist/`, and uploads the artifact for distribution.

## Security baseline
- SECURITY.md defines reporting channel (`security@paywaz.com`).
- Permissions tightened to `contents: read` for workflows. No secret context required.
- No dependency scanning, secret scanning, or SBOM generation is enabled yet.

## Release readiness
- Proprietary license documented in `LICENSE` (mirrors `paywaz-license`).
- No tagged releases, changelog, or automated publishing of the `dist/` artifact; builds are manual.
- Package is marked `private` with Node 20+ engine declaration to avoid accidental publication.

## Ops readiness
- Static docs served via `npm run start`/`npm run preview`; no runtime services or health endpoints.
- No deployment runbook or monitoring for hosted docs; add if/when a hosting target is configured.

## Repo hygiene
- Baseline governance files present: README, LICENSE, CODEOWNERS, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, HEALTH.
- `.editorconfig` and `.gitignore` added for consistent formatting and artifact hygiene.
- Golden commands documented in README and enforced in CI.
