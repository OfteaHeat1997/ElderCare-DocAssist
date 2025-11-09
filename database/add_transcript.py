#!/usr/bin/env python3
"""
Simple script to add Whisper transcript to database
For students learning how to connect speech-to-text with database
"""

import sqlite3
import os

# Paths
TRANSCRIPT_FILE = '../backend/models/test_audio/transcript.txt'
DB_FILE = 'eldercare_dev.db'

print("=" * 50)
print("Add Whisper Transcript to Database")
print("=" * 50)

# Check if transcript exists
if not os.path.exists(TRANSCRIPT_FILE):
    print("\n❌ No transcript.txt found!")
    print(f"   Looking for: {TRANSCRIPT_FILE}")
    print("\n   Run Whisper first to create transcript.txt")
    exit(1)

# Read transcript
with open(TRANSCRIPT_FILE, 'r', encoding='utf-8') as f:
    transcript_text = f.read().strip()

print(f"\n📄 Found transcript:")
print(f"   {transcript_text[:100]}...")

# Connect to database
conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

# Add to database
print("\n💾 Adding to database...")
c.execute('''
    INSERT INTO notes (transcript, S_text, O_text, A_text, P_text, review_state)
    VALUES (?, ?, ?, ?, ?, ?)
''', (
    transcript_text,
    'TODO: Add what patient said',
    'TODO: Add what you observed',
    'TODO: Add your assessment',
    'TODO: Add the plan',
    'draft'
))

conn.commit()
note_id = c.lastrowid

print(f"✅ Added as Note #{note_id}")
print("\n   Next steps:")
print("   1. Open your database in IDE")
print(f"   2. Find note #{note_id}")
print("   3. Fill in the SOAP fields (S, O, A, P)")
print("   4. Add vitals if needed")

# Show the note
print("\n📋 What's in database now:")
c.execute('SELECT id, transcript FROM notes WHERE id = ?', (note_id,))
row = c.fetchone()
print(f"   Note {row[0]}: {row[1][:80]}...")

conn.close()

print("\n" + "=" * 50)
print("Done! Check your database in the IDE")
print("=" * 50)
