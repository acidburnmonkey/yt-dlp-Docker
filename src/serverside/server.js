//must be manually started: node serverside/server.js

import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to access API
app.use(express.json()); // For /download

function isVideoFile(arg) {
  const validExtensions = [
    '.webm',
    '.3gp',
    '.aac',
    '.m4a',
    '.flv',
    '.mp3',
    '.mp4',
    '.ogg',
    '.wav',
    '.opus',
  ];
  return validExtensions.some((ext) => arg.toString().endsWith(ext));
}

//3gp, aac, flv, m4a, mp3, mp4, ogg, wav, webm

// Function to read files
async function readFiles() {
  const rootPath = path.resolve('./downloads/');
  let files = await fs.readdir(rootPath);

  // console.log('working on rootPath:' + rootPath);

  // Filter for CSS files (modify this if needed)
  files = files.filter(isVideoFile);

  const objList = await Promise.all(
    files.map(async (file, i) => {
      let filePath = path.join(rootPath, file);
      let fileStats = await fs.stat(filePath);

      return {
        id: i,
        name: file,
        mDate: new Date(fileStats.mtime).toLocaleDateString(),
      };
    }),
  );

  return objList;
}

// API Route
app.get('/files', async (req, res) => {
  try {
    const files = await readFiles();
    res.json(files);
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Failed to read files' });
  }
});

// Download api with yt-dlp
app.post('/download', async (req, res) => {
  const { url, passArgs } = req.body;
  console.log(url);
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const binary = spawn('./serverside/yt-dlp_linux', [
      '--progress',
      ...passArgs,
      '-o',
      './downloads/%(title)s.%(ext)s',
      url,
    ]);

    let stdout = '';
    let stderr = '';

    // Collect stdout
    binary.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    // Collect stderr
    binary.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Wait for the process to finish, then send the response
    binary.on('close', (code) => {
      if (code === 0) {
        // Success case: Send stdout
        res.status(200).json({ message: 'Download completed', output: stdout });
      } else {
        // Error case: Send stderr
        res.status(500).json({ error: 'Download failed', output: stderr });
      }
    });
  } catch (error) {
    // Handle errors in spawning the process
    console.error('Error spawning yt-dlp:', error);
    res
      .status(500)
      .json({ error: 'Failed to start download', output: error.message });
  }

  //
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//front end docker
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve('dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
}); // Serve static frontend files from dist/
