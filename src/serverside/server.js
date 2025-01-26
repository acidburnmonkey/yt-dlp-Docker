//must be manually started:  node server.js

import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to access API

function isVideoFile(arg) {
  if (arg.toString().endsWith('.css')) {
    return true;
  } else {
    return false;
  }
}

// Function to read files
async function readFiles() {
  const rootPath = path.resolve('./downloads/');
  let files = await fs.readdir(rootPath);

  console.log('working on rootPath:' + rootPath);

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
