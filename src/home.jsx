'use strict';
import './css/style.css';
import { useState, useEffect, createContext } from 'react';
import Item from './components/items.jsx';
import DownloadBar from './components/downloadBar.jsx';
import TopBar from './components/topBar.jsx';
import Options from './components/options.jsx';

export const ContexPortal = createContext();

function Home() {
  const [files, setFiles] = useState([]);
  const [contextData, setContextData] = useState({
    sponsorBlock: false,
    splitChaptersVideo: false,
    entirePlaylist: false,
    audio: false,
    splitChaptersAudio: false,
  });

  useEffect(() => {
    async function getFiles() {
      const response = await fetch('http://localhost:5022/files');
      const data = await response.json();
      setFiles(data);
    }
    getFiles();

    const interval = setInterval(getFiles, 1000); // Refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <ContexPortal.Provider value={{ contextData, setContextData }}>
      <div className="home">
        <TopBar />
        <div className="downloadForm" id="downloadForm">
          <DownloadBar />
        </div>
        <div>
          <Options />
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
    </ContexPortal.Provider>
  );
}

export default Home;
