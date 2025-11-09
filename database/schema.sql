-- ElderCare-DocAssist Database Schema
-- SQLite + SQLCipher for local encrypted storage

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    audio_path TEXT,
    transcript TEXT,
    soap_data JSON,
    review_state TEXT CHECK(review_state IN ('draft', 'reviewed', 'approved')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vitals table
CREATE TABLE IF NOT EXISTS vitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note_id INTEGER,
    blood_pressure TEXT,
    heart_rate INTEGER,
    temperature REAL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);
