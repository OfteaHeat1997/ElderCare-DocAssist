# Database

This directory contains the database schema and files for ElderCare-DocAssist.

## Files

- **`eldercare_dev.db`** - Development database (already created, ready to use)
- **`schema.sql`** - Database structure definition (for reference)
- **`DATA_DICTIONARY.md`** - Field mappings to ZIB healthcare standards
- **`RETENTION.md`** - Data retention and deletion policies



## Database Structure

**notes table:**
- SOAP fields: `S_text`, `O_text`, `A_text`, `P_text`
- Audio: `transcript`, `audio_path`
- Workflow: `review_state` (draft/reviewed/approved)

**vitals table:**
- `systolic_mmHg`, `diastolic_mmHg`
- `temperature_c`, `heart_rate_bpm`
- Links to notes via `note_id`

See `DATA_DICTIONARY.md` for complete ZIB mappings.

## For Production (Encrypted)

When deploying with SQLCipher encryption, the app will handle database creation with encryption key. Don't commit `.db` files to git.
