# Ollama Guide for Students

## What is Ollama?

Ollama is a **local AI** that runs on your computer. It helps generate SOAP notes from nurse keywords.

- Runs offline (no internet needed)
- Free and private
- Simple to use

## Already Installed!

Ollama is already running in Docker! No extra setup needed.

## How to Use Ollama (3 Steps)

### Step 1: Make Sure Docker is Running

```bash
docker-compose up -d
```

Check if Ollama is working:

```bash
docker exec eldercare-ollama ollama list
```

You should see `llama3.2:1b` in the list.

### Step 2: Test Ollama

Run the test:

```bash
cd backend
node test_ollama.js
```

This will:
1. Send nurse keywords to Ollama
2. Get back a SOAP note
3. Print it in your terminal

### Step 3: Try Your Own Example

Edit `test_ollama.js` and change the `nurseInput`:

```javascript
const nurseInput = `
Patient: 82-year-old man
Complaints: Coughing, tired
Vitals: BP 135/80, Temp 37.5°C, HR 82
`;
```

Run it again:

```bash
node test_ollama.js
```

## How It Works

```
Nurse Keywords  →  Ollama (AI)  →  SOAP Note
                   (port 11434)

Example:
Input:  "headache, BP 140/85"
Output: "S: Patient reports headache
         O: BP 140/85 mmHg
         A: Mild hypertension
         P: Monitor BP, rest"
```

## API Call

Ollama accepts JSON:

```javascript
{
  "model": "llama3.2:1b",
  "prompt": "Your question here",
  "stream": false
}
```

Send to: `http://localhost:11434/api/generate`

Get back:

```javascript
{
  "response": "The AI's answer"
}
```

That's it!

## Common Questions

**Q: Do I need internet?**
A: No! Ollama runs 100% offline.

**Q: Is it free?**
A: Yes! Completely free and open source.

**Q: Can it speak Dutch?**
A: Yes! Just ask in Dutch.

**Q: How do I stop it?**
A: `docker-compose down`

## For Your Team

Everyone on your team:
1. Starts Docker: `docker-compose up -d`
2. Runs test: `node backend/test_ollama.js`
3. Sees the same results!

## Model Size

We use `llama3.2:1b`:
- Size: 1.3 GB
- Speed: Fast (good for laptops)
- Quality: Good enough for student projects

## Next Steps

Once this works, you can:
1. Connect it to your frontend (React Native)
2. Save results to database
3. Add Whisper (speech → text → Ollama → SOAP)

---

**Questions?** Run `docker-compose logs ollama` to see what Ollama is doing!
