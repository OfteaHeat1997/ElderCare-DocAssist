#!/usr/bin/env python3
"""
Dutch Audio Transcription using Whisper
For VoiceVerzorging healthcare documentation system
"""
import whisper
import sys
import json
import os

# Add ffmpeg to PATH so Whisper can find it
os.environ["PATH"] = r"C:\ffmpeg\bin;" + os.environ["PATH"]

def transcribe_audio(audio_path):
    """
    Transcribe Dutch audio file to text
    
    Args:
        audio_path: Full path to audio file
        
    Returns:
        0 on success, 1 on error
        Prints JSON to stdout
    """
    try:
        print(f"Loading Whisper model...", file=sys.stderr)
        model = whisper.load_model("base")
        
        print(f"Transcribing: {audio_path}", file=sys.stderr)
        result = model.transcribe(
            audio_path,
            language="nl",  # Force Dutch language
            fp16=False       # Use CPU (no GPU needed)
        )
        
        # Create JSON output
        output = {
            "text": result["text"].strip(),
            "language": result["language"],
            "duration": result.get("duration", 0)
        }
        
        # Print JSON to stdout (Java reads this)
        print(json.dumps(output, ensure_ascii=False))
        return 0
        
    except Exception as e:
        # Print error as JSON
        error = {
            "error": str(e),
            "text": "",
            "language": "nl",
            "duration": 0
        }
        print(json.dumps(error), file=sys.stderr)
        return 1

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No audio file provided"}))
        sys.exit(1)
    
    audio_path = sys.argv[1]
    sys.exit(transcribe_audio(audio_path))