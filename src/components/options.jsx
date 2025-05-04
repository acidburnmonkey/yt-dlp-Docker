import { useState } from 'react';
import '../css/options.css';

function Options() {
  const [options, setOptions] = useState(false);
  const handleClick = () => {
    options ? setOptions(false) : setOptions(true);
  };

  if (!options) {
    return (
      <button onClick={() => handleClick()} className="optionsButton">
        Options ⮟
      </button>
    );
  } else {
    return (
      <>
        <button onClick={() => handleClick()} className="optionsButton">
          Options ⮝
        </button>
        <div className="optionsContainer">
          <div className="leftColum">
            <label className="switch">
              <span className="labelText">SponsorBlock </span>
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>

            <label className="switch">
              Split chapters into videos
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <label className="switch">
              Entire Playlist
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="rightColum">
            <label className="switch">
              Audio Only
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>

            <label className="switch">
              Split chapters into tracks
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default Options;
