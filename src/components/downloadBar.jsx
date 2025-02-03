import { useState } from 'react';

function DownloadBar() {
  const [value, setValue] = useState('');

  const downloadHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: value }),
      });
      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error sending link to server:', error);
    }
  };

  return (
    <div>
      <form onSubmit={downloadHandler}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="enter link"
        />
        <button type="submit">Download</button>
      </form>
    </div>
  );
}
export default DownloadBar;
