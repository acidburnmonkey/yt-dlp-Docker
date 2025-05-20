import { useContext, useState } from 'react';
import '../css/downloadBar.css';
import { ContexPortal } from '../home';
import AlertComponent from './alertComponent';

function DownloadBar() {
  const [value, setValue] = useState('');
  const { contextData, setContextData } = useContext(ContexPortal);
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('ok');

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

  // helper to show & auto-hide alert
  const showAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };

  //downloadHandler
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

      if (response.ok) {
        const data = await response.json();

        showAlert('Media Downloaded' || 'Download started!', 'ok');

        //debugg OK
        console.log(data.message + '\n' + (data.output || ''));
      } else {
        const errorData = await response.json();
        showAlert(errorData.output || 'Something went wrong', 'err');

        //Debug
        console.log(
          'Error: ' +
            errorData.error +
            (errorData.output ? '\n' + errorData.output : ''),
        );
      }
    } catch (error) {
      console.error('Error sending link to server:', error);
    } finally {
      setValue((v) => (v = ''));
      document.getElementById('inputField').value = '';
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={downloadHandler}>
          <input
            id="inputField"
            className="inputField"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)} //test
            placeholder="enter link"
          />
          <button className="submit" type="submit">
            Download
          </button>
        </form>
      </div>

      {visible && <AlertComponent message={alertMessage} type={alertType} />}
    </>
  );

  //
}
export default DownloadBar;
