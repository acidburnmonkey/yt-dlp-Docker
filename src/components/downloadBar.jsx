import { useContext, useState } from 'react';
import '../css/downloadBar.css';
import { ContexPortal } from '../home';
import Item from './items';

function DownloadBar() {
  const [value, setValue] = useState('');
  const { contextData, setContextData } = useContext(ContexPortal);

  let passedArgs = [];

  //yandere section fuck it
  if (contextData.audio === true) {
    passedArgs.push('-x');
  }
  if (contextData.sponsorBlock) {
    passedArgs.push('--sponsorblock-remove', 'all');
  }
  if (contextData.entirePlaylist) {
    passedArgs.push('--yes-playlist');
  }
  if (contextData.splitChaptersAudio) {
    passedArgs.push('-x', '--split-chapters');
  }
  if (contextData.splitChaptersVideo) {
    passedArgs.push('--split-chapters', '-f', 'bv*+ba/b');
  }

  const downloadHandler = async (e) => {
    e.preventDefault();
    console.log('passedArgs: ', passedArgs);

    try {
      const response = await fetch('/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value, passArgs: passedArgs }),
      });
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error sending link to server:', error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={downloadHandler}>
        <input
          className="imputField"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="enter link"
        />
        <button className="submit" type="submit">
          Download
        </button>
      </form>
    </div>
  );
}
export default DownloadBar;
