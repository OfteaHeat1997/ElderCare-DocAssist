// Ollama Service - Connects to Docker Ollama container for SOAP note generation
// This is YOUR code, separate from Tim's backend

// Ollama runs in Docker on port 11434
// For phone testing: change localhost to your computer's IP (run 'ipconfig' to find it)
const OLLAMA_URL = 'http://localhost:11434';

// The model to use - qwen2.5:3b is good for Dutch (needs 8GB RAM)
// Alternative: qwen2.5:1.5b for 4GB RAM laptops
const MODEL = 'qwen2.5:3b';

/**
 * Generate a SOAP note from transcribed text
 * SOAP = Subjective, Objective, Assessment, Plan
 *
 * @param {string} transcribedText - The Dutch transcription from Whisper
 * @returns {Promise<string>} - The SOAP note
 */
export const generateSOAPNote = async (transcribedText) => {
  try {
    const prompt = `You are a nursing assistant. Convert this spoken note into a structured SOAP report.

SOAP format explanation:
- S (Subjective): What the patient says, complaints, feelings
- O (Objective): Measurable observations, vital signs
- A (Assessment): Evaluation of the situation
- P (Plan): Follow-up actions, treatment plan

Spoken note:
"${transcribedText}"

Write a concise SOAP report:

S (Subjective):`;

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3,  // Lower = more consistent output
          num_predict: 500,  // Max tokens to generate
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Ollama request failed');
    }

    const data = await response.json();
    return data.response;

  } catch (error) {
    console.error('Error generating SOAP note:', error);
    throw error;
  }
};

/**
 * Check if Ollama is running and the model is available
 * @returns {Promise<boolean>}
 */
export const checkOllamaStatus = async () => {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`);
    if (!response.ok) return false;

    const data = await response.json();
    const hasModel = data.models?.some(m => m.name.includes('qwen'));
    return hasModel;
  } catch {
    return false;
  }
};

/**
 * Get list of available models
 * @returns {Promise<string[]>}
 */
export const getAvailableModels = async () => {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`);
    const data = await response.json();
    return data.models?.map(m => m.name) || [];
  } catch {
    return [];
  }
};
