'use strict';

import { useState, useEffect } from 'react';
import Item from './components/items.jsx';

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
      <p>TEST</p>
      <div className="listBox">
        <div className="listItem"></div>
        {files.map((file) => (
          <Item arg={file} key={file.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
