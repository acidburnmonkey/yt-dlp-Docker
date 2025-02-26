'use strict';
import './css/style.css';
import { useState, useEffect } from 'react';
import Item from './components/items.jsx';
import DownloadBar from './components/downloadBar.jsx';
import TopBar from './components/topBar.jsx';

function Home() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function getFiles() {
      const response = await fetch('http://localhost:5000/files');
      const data = await response.json();
      setFiles(data);
    }
    getFiles();

    const interval = setInterval(getFiles, 1000); // Refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <TopBar />
      <div className="downloadForm" id="downloadForm">
        <DownloadBar />
      </div>
      <div className="underlay">
        <div className="listBox">
          <div className="listItem"></div>
          {files.map((file) => (
            <Item arg={file} key={file.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
