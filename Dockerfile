# Stage 1: Build Vite React frontend
FROM node:20 AS builder

WORKDIR /app

# Copy project files
COPY package*.json ./
COPY vite.config.* ./
COPY index.html ./
COPY public/ ./public
COPY src/ ./src

# Install deps and build frontend
RUN npm install
RUN npm run build

# Stage 2: Production image with API, frontend, and ffmpeg
FROM node:20

# Install ffmpeg
RUN apt update && apt install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy server files from src
COPY src/serverside ./serverside
RUN chmod +x ./serverside/yt-dlp_linux

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Install only runtime dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Set up download volume
VOLUME ["/app/downloads"]

# Set env var so user can override the port
ENV PORT=5000

# Start server
CMD ["node", "serverside/server.js"]

EXPOSE 5000

