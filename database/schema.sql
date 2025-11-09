 PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      audio_path TEXT,
      transcript TEXT,
      S_text TEXT,
      O_text TEXT,
      A_text TEXT,
      P_text TEXT,
      review_state TEXT CHECK(review_state IN ('draft', 'reviewed', 'approved')) DEFAULT 'draft'
  );

  CREATE TABLE IF NOT EXISTS vitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id INTEGER NOT NULL,
      recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      systolic_mmHg INTEGER,
      diastolic_mmHg INTEGER,
      temperature_c REAL,
      heart_rate_bpm INTEGER,
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_notes_review_state ON notes(review_state);
  CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);
  CREATE INDEX IF NOT EXISTS idx_vitals_note_id ON vitals(note_id);

  CREATE TRIGGER IF NOT EXISTS trg_notes_updated_at
  AFTER UPDATE ON notes
  FOR EACH ROW
  WHEN NEW.updated_at IS NULL OR NEW.updated_at = OLD.updated_at
  BEGIN
      UPDATE notes SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
  END;
