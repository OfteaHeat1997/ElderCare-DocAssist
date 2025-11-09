# Database Tutorial for Students

Simple guide to add and view patient notes in the database.

## Step 1: Connect to Database

**In your IDE (IntelliJ/DataGrip/VS Code):**

1. Open **Database panel**
2. Click **`+`** → **SQLite**
3. Path: `database/eldercare_dev.db`
4. Click **"OK"**
5. You should see: **notes** and **vitals** tables

## Step 2: Add Your First Note

**Open a console** for eldercare_dev.db and run:

```sql
-- Add a patient note
INSERT INTO notes (S_text, O_text, A_text, P_text, transcript)
VALUES (
    'Patient complains of headache and fever',
    'Temperature 38.5°C, looks tired, no rash visible',
    'Possible flu or viral infection',
    'Give paracetamol 500mg, monitor temperature, rest',
    'Mevrouw klaagt over hoofdpijn en koorts'
);
```

**Press Execute!** ✅

## Step 3: Add Vital Signs

```sql
-- Add vitals for the note we just created
-- note_id = 1 (the first note)
INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (1, 125, 82, 38.5, 92);
```

**Press Execute!** ✅

## Step 4: View Your Data

**See all notes:**
```sql
SELECT * FROM notes;
```

**See all vitals:**
```sql
SELECT * FROM vitals;
```

**See notes WITH vitals (joined):**
```sql
SELECT
    n.id,
    n.S_text,
    n.O_text,
    n.A_text,
    n.P_text,
    v.systolic_mmHg,
    v.diastolic_mmHg,
    v.temperature_c,
    v.heart_rate_bpm
FROM notes n
LEFT JOIN vitals v ON n.id = v.note_id;
```

## Step 5: Add More Examples

**Example 2: Wound care**
```sql
INSERT INTO notes (S_text, O_text, A_text, P_text)
VALUES (
    'Patient says wound is painful',
    'Redness 2cm around wound edge, slight swelling',
    'Possible infection starting',
    'Clean wound twice daily, apply antibiotic ointment, check tomorrow'
);

INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (2, 130, 85, 37.2, 78);
```

**Example 3: Regular checkup**
```sql
INSERT INTO notes (S_text, O_text, A_text, P_text)
VALUES (
    'Patient feels fine today',
    'Alert and active, good appetite, no complaints',
    'Stable condition, no concerns',
    'Continue current medication, regular monitoring'
);

INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (3, 118, 76, 36.8, 72);
```

## Common Queries You'll Need

**Find notes by review state:**
```sql
-- Find all draft notes
SELECT * FROM notes WHERE review_state = 'draft';

-- Find approved notes
SELECT * FROM notes WHERE review_state = 'approved';
```

**Find notes from today:**
```sql
SELECT * FROM notes
WHERE DATE(created_at) = DATE('now');
```

**Find high blood pressure:**
```sql
SELECT n.S_text, v.systolic_mmHg, v.diastolic_mmHg
FROM notes n
JOIN vitals v ON n.id = v.note_id
WHERE v.systolic_mmHg > 140 OR v.diastolic_mmHg > 90;
```

**Find high temperature:**
```sql
SELECT n.S_text, v.temperature_c
FROM notes n
JOIN vitals v ON n.id = v.note_id
WHERE v.temperature_c > 38.0;
```

## Update Data

**Change review state:**
```sql
-- Mark note as reviewed
UPDATE notes
SET review_state = 'reviewed'
WHERE id = 1;

-- Mark note as approved
UPDATE notes
SET review_state = 'approved'
WHERE id = 1;
```

**Edit a note:**
```sql
UPDATE notes
SET P_text = 'Give paracetamol 1000mg, monitor temperature every 4 hours'
WHERE id = 1;
```

## Delete Data

**Delete a note (vitals will be deleted automatically):**
```sql
DELETE FROM notes WHERE id = 1;
```

**Delete old drafts:**
```sql
DELETE FROM notes
WHERE review_state = 'draft'
AND created_at < DATE('now', '-30 days');
```

## Understanding SOAP

**S = Subjective** - What the patient says
- "I have a headache"
- "My stomach hurts"
- "I feel dizzy"

**O = Objective** - What you observe/measure
- "Temperature is 38.5°C"
- "Redness around wound"
- "Patient looks tired"

**A = Assessment** - Your professional judgment
- "Possible flu"
- "Likely infection"
- "Stable condition"

**P = Plan** - What to do next
- "Give medication"
- "Monitor symptoms"
- "Check again tomorrow"

## Practice Exercise

**Try adding this complete patient case:**

```sql
-- Patient: Mrs. Johnson, shortness of breath
INSERT INTO notes (
    S_text,
    O_text,
    A_text,
    P_text,
    transcript
)
VALUES (
    'Patient reports difficulty breathing, especially when walking',
    'Breathing rate 24/min (elevated), oxygen saturation 94%, slight wheeze heard',
    'Possible respiratory infection or COPD exacerbation',
    'Contact doctor, consider oxygen therapy, monitor breathing every 2 hours',
    'Mevrouw heeft moeite met ademhalen vooral bij lopen'
);

INSERT INTO vitals (note_id, systolic_mmHg, diastolic_mmHg, temperature_c, heart_rate_bpm)
VALUES (LAST_INSERT_ROWID(), 135, 88, 37.4, 96);
```

**Then view it:**
```sql
SELECT * FROM notes ORDER BY id DESC LIMIT 1;
```

## Tips

- ✅ Always start with `draft` review_state
- ✅ Use clear, simple language in notes
- ✅ Always add vitals when available
- ✅ Check your data after inserting: `SELECT * FROM notes ORDER BY id DESC LIMIT 1;`
- ⚠️ Be careful with DELETE - data is gone forever!

## Next Steps

Once you're comfortable with this:
1. Your React Native app will INSERT notes (like we just did)
2. Display notes in the app (using SELECT queries)
3. Let nurses approve/edit notes (UPDATE queries)
4. Export to healthcare systems

**Practice these queries until you feel confident!** 💪
