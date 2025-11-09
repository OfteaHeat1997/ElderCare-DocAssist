# Database

Database for storing patient notes and vital signs.

## What's Here

- **`eldercare_dev.db`** - The actual database (already created and ready!)
- **`schema.sql`** - Shows the database structure (just for reference)
- **`DATA_DICTIONARY.md`** - Explains what each field means
- **`RETENTION.md`** - When to delete old data

## How to Connect

**In your IDE (IntelliJ/DataGrip/VS Code):**

1. Open Database panel
2. Click `+` → New Data Source → SQLite
3. Point to: `database/eldercare_dev.db`
4. Click "Test Connection" → Click "OK"
5. Done! You can now see the tables.

**Important:** Connect to `eldercare_dev.db`, NOT `schema.sql`!

## Database Tables

### notes
Stores patient documentation:
- `S_text` - Subjective (what patient says)
- `O_text` - Objective (what you observe)
- `A_text` - Assessment (your analysis)
- `P_text` - Plan (what to do next)
- `transcript` - Audio converted to text
- `review_state` - Status: draft, reviewed, or approved

### vitals
Stores measurements:
- `systolic_mmHg` - Top blood pressure number
- `diastolic_mmHg` - Bottom blood pressure number
- `temperature_c` - Body temperature in Celsius
- `heart_rate_bpm` - Heart beats per minute
- `note_id` - Links to a note

## Try It Out

**Add a test note:**
```sql
INSERT INTO notes (S_text, O_text, A_text, P_text)
VALUES (
    'Patient complains of wound pain',
    'Redness 2cm around wound edge',
    'Possible mild infection',
    'Clean wound, apply ointment, check in 4 hours'
);
```

**Add vitals for that note:**
```sql
INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (1, 132, 84, 37.8, 86);
```

**View everything:**
```sql
SELECT * FROM notes;
SELECT * FROM vitals;
```

## Important Notes

- ✅ Database file is already created - just connect to it!
- ⚠️ Don't commit `.db` files to git (already in .gitignore)
- 📖 See `DATA_DICTIONARY.md` for field details
