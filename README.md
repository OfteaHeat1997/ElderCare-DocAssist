# ElderCare-DocAssist

Student group project: Prototype that converts quick voice notes/keywords into elderly-care documentation drafts with human-in-the-loop review and privacy-by-design.

## Project Overview

Privacy-first mobile app that helps nurses document care using:
- Voice recording → Whisper transcription
- AI-generated SOAP notes (Ollama)
- Local-only processing (no cloud)
- ZIB/BGZ standard exports

## Structure

```
├── frontend/          # React Native app
├── backend/           # Local AI (Whisper + Ollama)
├── database/          # SQLite schema & retention policies
├── docs/              # Research, standards, design
├── tests/             # UX & acceptance tests
└── ops/               # Docker & CI (future)
```

## Branch Strategy

- `main` - Stable project version
- `frontend-ui` - React Native screens & navigation
- `backend-api` - API logic & local integration
- `ai-models` - Whisper/Ollama setup & prompts
- `database-storage` - SQLite + SQLCipher schema
- `privacy-security` - Deletion rules, encryption, GDPR
- `testing-validation` - UX tests & demo validation
- `documentation` - Research, diagrams, README updates

## Quick Start

**With Docker (Recommended):**

```bash
# Start all services
docker-compose up -d

# Open database viewer in browser
http://localhost:8080
```

See `QUICK_START.md` for full guide or `DOCKER_SETUP.md` for details.

**Manual Setup:**

1. Clone the repository
2. See `frontend/.env.example` for app configuration
3. See `backend/.env.example` for AI model setup
4. Review `database/schema.sql` for data structure

## Team Members

[Add your names here]
