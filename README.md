# Paywaz Documentation Hub (Public Preview)

Welcome to the **Paywaz Documentation Hub**, the central resource for technical, merchant, and architectural documentation related to the Paywaz ecosystem.

> **Important:**
> Paywaz is currently operating in **semi-stealth mode**.
> All documentation in this repository is a **public preview** intended for early integrators, partners, and candidates.
> Certain systems, flows, and endpoints are intentionally generalized or placeholder-only until public API access is released.

---

## Start Here: API → SDK → Samples

This repo is the **single landing hub** for Paywaz developer surface area:

1) **API (OpenAPI)**
- OpenAPI spec repo: https://github.com/hellopaywaz/paywaz-public-api
- Hosted API docs (embedded): https://hellopaywaz.github.io/paywaz-docs/

2) **SDK (JavaScript)**
- SDK repo: https://github.com/hellopaywaz/paywaz-sdk-js
- SDK TypeDoc (GitHub Pages): https://hellopaywaz.github.io/paywaz-sdk-js/

3) **Samples**
- Samples repo: https://github.com/hellopaywaz/paywaz-samples

**Recommended flow**
- Read the **API reference** → check **SDK TypeDoc** for types/helpers → run **Samples** locally (Node 20).

---

## Local development & verification

Requirements: **Node.js 20+**. Install dependencies with `npm ci` (no external packages are required).

Golden commands (also used in CI):
- `npm run lint` — trims trailing whitespace and checks the docs landing page metadata
- `npm run typecheck` — placeholder until TypeScript sources are added
- `npm test` — smoke-checks the docs landing page and required links
- `npm run build` — copies `docs/` to `dist/` for static hosting
- `npm run start` — serves `docs/` locally at http://localhost:4173
- `npm run preview` — serves the built `dist/` output at http://localhost:4174

Use `npm run format` to auto-fix common lint issues (trailing whitespace, missing final newline).

---

## What Is Paywaz?

Paywaz is a zero-fee, crypto-native global payments platform built on next-generation Web3 rails, featuring:

- **Zero-Fee Payment Processing**
- **High-Speed On-Chain Settlement (Solana Mainnet)**
- **Multi-Chain Support & Stablecoin Payments**
- **Non-Custodial Blockchain Security** — ensuring bank-grade security, safeguarding transactions and building trust within your ecosystem
- **Hedged Stablecoins (PZUSD, PZGBP, PZEUR, etc.)**
- **Merchant, Enterprise, and Workforce Solutions**

This repository documents the structure, concepts, flows, and tools developers will use to integrate Paywaz as we progress toward public launch.

---

## Repository Structure

```text
paywaz-docs/
│
├── getting-started/
│   └── overview.md            # What Paywaz is, how it works, and key concepts
│
├── guides/
│   ├── merchants.md           # Merchant onboarding, payments, and settlement
│   └── developers.md          # Developer workflows, integrations, best practices
│
└── architecture/
    └── system-overview.md     # High-level description of Paywaz architecture

Additional documentation — including API references, SDK guides, checkout flows,
webhooks, and treasury mechanics — will be added as public endpoints and tools
become available.

---

## Who This Documentation Is For

This repository is intended for:

- Developers preparing to integrate Paywaz
- Technical leads evaluating platform compatibility
- Enterprises exploring partnership opportunities
- Internal/external collaborators
- Candidates reviewing Paywaz engineering direction

While certain implementation details remain private, this knowledge base
provides a strong foundation for understanding Paywaz’s capabilities and
integration model.

---

## Related Repositories

| Repository | Description |
|-----------|-------------|
| **paywaz-public-api** | Public API structure, examples, OpenAPI placeholder |
| **paywaz-sdk-js** | JavaScript SDK (preview) |
| **paywaz-samples** | Integration examples (JS, Python, cURL) |

Explore more at the Paywaz GitHub organization:
https://github.com/hellopaywaz

---

## Roadmap for Documentation Expansion

As Paywaz transitions toward open API access, this repository will grow to
include:

### **v0.2**
- Webhooks and event signatures
- Authentication deep-dive
- Checkout session flows

### **v0.3**
- Error model & retry strategies
- POS integration documentation
- Workforce payments documentation

### **v0.4**
- Solana wallet integration guide
- Hedged stablecoin mechanics (public-safe version)
- Cross-border payment flows

### **v1.0 (Public API Launch)**
- Full API reference
- SDK guides (JS, Python, POS)
- Merchant dashboard integration docs
- Reporting & settlement APIs
- Compliance & security documentation

---

## License

Documentation in this repository is provided under the **Paywaz Proprietary
License**, unless otherwise noted.

See:
`paywaz-license`

---

## Contributing

Public contributions are welcome where appropriate.

Please review:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

Before submitting issues or suggestions.

---

## Contact & Support

For partnership, integration, or early-access inquiries:

**hello@paywaz.com**
https://paywaz.com

---

**Paywaz.com LLC — Zero-Fee Crypto-Native Payments Infrastructure**
Built for global commerce. Powered by the next generation of digital settlement rails.

