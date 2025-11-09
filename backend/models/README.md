# AI Models Directory

This directory contains AI model files (NOT included in git).

## Required Models

### Whisper (Speech-to-Text) - Dutch Language
- Download models from: https://huggingface.co/ggerganov/whisper.cpp/tree/main
  (Go to the "Files and versions" section and download the desired model file)
- Place in: `whisper/`
- **Recommended for Dutch**: `ggml-base.bin` or `ggml-small.bin`
  - `base`: Good accuracy, faster processing
  - `small`: Better accuracy for medical terms
  - `medium`: Best accuracy (larger, slower)
- Whisper supports multilingual transcription including Dutch
- All processing on-device (privacy-safe)

- Speech Recognition: Whisper / Google Speech-to-Text API (for Dutch and multilingual ASR)

### Ollama (SOAP Generation)
# Models Directory

## Overview

This directory contains configuration files and resources for running and managing local Large Language Models (LLMs) using [Ollama](https://ollama.ai). These models are used by the ElderCare-DocAssist backend to provide natural language processing capabilities, such as summarization, question answering, and document analysis.

## Installation

1. **Install Ollama**

   Download and install Ollama from the [official website](https://ollama.ai/download) for your operating system.

2. **Start Ollama**

   After installation, start the Ollama service:

   - On Windows: Run `ollama serve` in a terminal.
   - On macOS/Linux: Run `ollama serve` in a terminal.

3. **Pull Required Models**

   Use the following commands to download the required models:

   ```sh
   ollama pull llama2
   ollama pull mistral
   # Add more models as needed
   ```

## Available Models

The following models are used or supported in this project:

- **llama2**: General-purpose LLM for conversation and summarization.
- **mistral**: Lightweight, fast LLM for quick responses.

You can add or update models by editing the configuration files in this directory and pulling new models with Ollama.

## Usage

Once Ollama is running and the required models are pulled, the backend will automatically connect to the Ollama service to perform inference tasks.

Example usage in the backend (pseudocode):

- Models to pull: `llama2` or `mistral`
- Config files go in: `ollama/`

## Test Audio
- Place synthetic test files in: `test_audio/`
- Format: .wav, .mp3
- Keep files small (<1MB)

## Prompts
- SOAP generation templates in: `prompts/`
- Follow V&VN nursing standards
