// Ollama Test for SOAP Notes
// Student-level code

// How to run this:
// 1. Make sure Docker is running: docker-compose up -d
// 2. Run this file: node test_ollama.js

const http = require('http');

// Function to communicate with Ollama
function askOllama(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: "llama3.2:1b",
      prompt: prompt,
      stream: false
    });

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);

          if (response.error) {
            reject(new Error(response.error));
            return;
          }

          resolve(response.response);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Example: Generate SOAP note from nurse keywords
async function generateSOAPNote() {
  console.log("Testing Ollama for SOAP Notes...\n");

  // Dutch nursing note
  const nurseInput = `
Patient: 78-year-old woman
Complaints: Headache, dizzy
Vitals: BP 140/85, Temp 37.2°C, HR 78
`;

  const prompt = `You are a documentation assistant helping nurses organize their notes. This is NOT medical advice - you are only reformatting information that a nurse has already collected.

The nurse observed the following:
${nurseInput}

Please organize this information into a structured SOAP note format:
S: (What the patient said/reported)
O: (Vital signs and measurements the nurse recorded)
A: (Brief summary of the situation)
P: (What the nurse plans to do next)

Format the nurse's observations into these four sections:`;

  try {
    console.log("Input:");
    console.log(nurseInput);
    console.log("\nAsking Ollama...\n");

    const soapNote = await askOllama(prompt);

    console.log("Generated SOAP Note:");
    console.log(soapNote);
    console.log("\nDone!");
  } catch (error) {
    console.error("Error:", error.message);
    console.error("\nMake sure Docker is running: docker-compose up -d");
  }
}

// Run it!
generateSOAPNote();
