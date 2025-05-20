# Stage 1: Build Vite React frontend
FROM node:24-alpine AS builder

WORKDIR /app

# Copy manifest & source
COPY package*.json ./
COPY vite.config.* ./
COPY index.html ./
COPY public/ ./public
COPY src/ ./src

# Install deps & build
RUN npm install
RUN npm run build

# Stage 2: Production image with API, frontend, and ffmpeg
FROM node:24-alpine

# Install ffmpeg in Alpine
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy server side code & make the yt-dlp binary executable
COPY src/serverside ./serverside
RUN chmod +x ./serverside/yt-dlp_linux

# Pull in built frontend
COPY --from=builder /app/dist ./dist

# Runtime dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Data volume for downloads
VOLUME ["/app/downloads"]

# Allow port override, then expose default
ENV PORT=5000
EXPOSE 5000

# Launch the server
CMD ["node", "serverside/server.js"]

