# Database Setup

This directory contains database schema and documentation for ElderCare-DocAssist.

## Important: .sql vs .db Files

- **`schema.sql`** - Text script defining database structure (committed to git)
- **`*.db` files** - Actual SQLite database files (NOT committed to git)

**Common mistake:** Don't try to open `schema.sql` as a database in your IDE. It's just a script!

## Files

- `schema.sql` - Database schema with ZIB-compliant structure
- `DATA_DICTIONARY.md` - Field mappings to ZIB elements
- `RETENTION.md` - Data retention and deletion policies
- `migrations/` - Future schema changes

## Quick Setup

### Option A: Development Database (Unencrypted)

For testing and development:

```bash
# Create development database
sqlite3 database/eldercare_dev.db < database/schema.sql

# Verify tables were created
sqlite3 database/eldercare_dev.db ".tables"
```

**Connect in VS Code/IDE:**
- Use database extension (e.g., SQLite Viewer)
- Connect to: `database/eldercare_dev.db` (NOT schema.sql!)

### Option B: Production Database (SQLCipher Encrypted)

For pilot/production with encryption:

**Install SQLCipher:**
```bash
# Windows (with Chocolatey)
choco install sqlcipher

# macOS
brew install sqlcipher

# Ubuntu/Debian
sudo apt-get install sqlcipher
```

**Create encrypted database:**

**IMPORTANT:** For SQLCipher, `PRAGMA key` MUST be the first statement after opening the database.

```bash
# Open SQLCipher CLI
sqlcipher database/eldercare.db
```

Then in the SQLCipher prompt (in this exact order):
```sql
-- MUST be first statement for SQLCipher databases
PRAGMA key = 'YourStrongPassword_OnlyForPilot!';

-- Now enable foreign keys and other settings
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- Load schema
.read database/schema.sql

-- Verify tables created
.tables

-- Exit
.quit
```

**For GUI tools with SQLCipher support:**
```sql
.open C:\Users\maria\Desktop\projects\ElderCare-DocAssist\database\eldercare.db
PRAGMA key = 'your_passphrase';   -- must be first statement
PRAGMA foreign_keys = ON;
-- now run schema / introspect
```

**Note:** Most GUI tools can't open encrypted databases. Use SQLCipher CLI or configure your app with the encryption key.

## Database Structure

### Tables

**notes**
- SOAP note fields: `S_text`, `O_text`, `A_text`, `P_text`
- Metadata: `transcript`, `audio_path`, `review_state`
- Timestamps: `created_at`, `updated_at`

**vitals**
- `systolic_mmHg`, `diastolic_mmHg` (Blood pressure)
- `temperature_c` (Body temperature in °C)
- `heart_rate_bpm` (Heart rate in beats per minute)
- Links to notes via `note_id` foreign key

See `DATA_DICTIONARY.md` for complete ZIB mappings.

## Testing

Example insert:
```sql
INSERT INTO notes (transcript, S_text, O_text, A_text, P_text)
VALUES (
    'Mevrouw klaagt over pijn in de wond',
    'Resident says wound is sore.',
    'Redness 2cm around edge.',
    'Likely mild infection.',
    'Clean, apply ointment, recheck in 4h.'
);

INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (1, 132, 84, 37.8, 86);
```

## For Your Team

- Backend developers: Use `eldercare_dev.db` for local testing
- Frontend developers: App will connect to encrypted database
- Don't commit `.db` files to git (already in .gitignore)
