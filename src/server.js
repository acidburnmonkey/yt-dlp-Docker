import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const PORT = 5000; // You can change this if needed

app.use(cors()); // Allow frontend to access API

// Function to read files
async function readFiles() {
  const rootPath = './'; // Change this to the directory you want to read
  let files = await fs.readdir(rootPath);

  // Filter for CSS files (modify this if needed)
  files = files.filter((file) => file.endsWith('.css'));

  const objList = await Promise.all(
    files.map(async (file, i) => {
      let fileStats = await fs.stat(file);
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
