// handles by server.js now
import { spawn } from 'node:child_process';

const argument = 'https://www.youtube.com/watch?v=XqRFvU06Gg4';
const binary = spawn('./yt-dlp_linux', [
  argument,
  '--progress',
  '--simulate',
  '-o',
  '../downloads/%(title)s.%(ext)s',
]);

binary.stdout.on('data', (data) => {
  console.log(data.toString());
});

binary.stderr.on('data', (err) => {
  console.log('some error :', err);
});

binary.on('close', (code) => {
  console.log('yt-dlp_linux exit with code :', code);
});
