-- ElderCare-DocAssist Database Schema
-- SQLite + SQLCipher for local encrypted storage
-- Maps to ZIB (Zorginformatiebouwstenen) elements - see DATA_DICTIONARY.md

-- For SQLCipher: open DB with a key first
-- PRAGMA key = 'your_passphrase';

-- Ensure foreign key constraints are enforced
PRAGMA foreign_keys = ON;

-- Notes table with SOAP structure
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Audio and transcription
    audio_path TEXT,
    transcript TEXT,

    -- SOAP note fields (ZIB mapped)
    S_text TEXT,  -- Subjective: CarePlan/Observation.note
    O_text TEXT,  -- Objective: Observation.comment
    A_text TEXT,  -- Assessment: Problem/Condition.assessment
    P_text TEXT,  -- Plan: CarePlan.activity

    -- Workflow state
    review_state TEXT CHECK(review_state IN ('draft', 'reviewed', 'approved')) DEFAULT 'draft'
);

-- Vitals table with ZIB-compliant units
CREATE TABLE IF NOT EXISTS vitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Blood pressure (ZIB BloodPressure)
    systolic_mmHg INTEGER,   -- mmHg
    diastolic_mmHg INTEGER,  -- mmHg

    -- Body temperature (ZIB BodyTemperature)
    temperature_c REAL,      -- °C

    -- Heart rate (ZIB HeartRate)
    heart_rate_bpm INTEGER,  -- bpm

    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_notes_review_state ON notes(review_state);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);
CREATE INDEX IF NOT EXISTS idx_vitals_note_id ON vitals(note_id);

-- Trigger to auto-update updated_at timestamp on row updates
-- Only updates if updated_at wasn't explicitly changed (prevents recursion)
CREATE TRIGGER IF NOT EXISTS trg_notes_updated_at
AFTER UPDATE ON notes
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
    UPDATE notes
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;
