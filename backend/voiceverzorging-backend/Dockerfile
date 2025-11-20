# Multi-stage Dockerfile for VoiceVerzorging Backend
# Includes Java Spring Boot + Python Whisper + ffmpeg

# Stage 1: Build Java application
FROM gradle:8.5-jdk17 AS build

WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Download dependencies (cached layer)
RUN gradle dependencies --no-daemon || true

# Copy source code
COPY src ./src

# Build application
RUN gradle bootJar --no-daemon

# Stage 2: Runtime with Java + Python
FROM eclipse-temurin:17-jre

WORKDIR /app

# Install Python, ffmpeg, and dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install Python Whisper
RUN pip3 install --no-cache-dir openai-whisper --break-system-packages

# Copy built JAR from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Copy Python transcription script
COPY whisper/transcribe.py /app/whisper/transcribe.py

# Create directories for models and temp files
RUN mkdir -p /app/models/temp

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Environment variables
ENV SPRING_PROFILES_ACTIVE=docker
ENV WHISPER_PYTHON_PATH=python3
ENV WHISPER_SCRIPT_PATH=/app/whisper/transcribe.py
ENV WHISPER_TEMP_DIR=/app/models/temp

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]