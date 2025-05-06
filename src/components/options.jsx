import { useContext, useState } from 'react';
import '../css/options.css';
import { ContexPortal } from '../home';

function Options() {
  //
  const { contextData, setContextData } = useContext(ContexPortal);
  const [options, setOptions] = useState(false); //

  const handleClick = () => {
    options ? handleCloseOptions() : setOptions(true);
  }; //

  const handleToggle = (key) => {
    setContextData((prev) => {
      let updated = { ...prev };

      // Toggle target value
      updated[key] = !prev[key];

      //logic constraints
      if (key === 'audio' && updated.audio) {
        updated.splitChaptersVideo = false;
      }

      if (key === 'splitChaptersVideo' && updated.splitChaptersVideo) {
        updated.audio = false;
        updated.splitChaptersAudio = false;
        updated.entirePlaylist = false;
      }

      if (key === 'splitChaptersAudio' && updated.splitChaptersAudio) {
        updated.splitChaptersVideo = false;
        updated.entirePlaylist = false;
      }

      if (key === 'entirePlaylist' && updated.entirePlaylist) {
        updated.splitChaptersAudio = false;
        updated.splitChaptersVideo = false;
      }

      return updated;
    });
  };

  //no options = no extra args
  const handleCloseOptions = () => {
    setContextData({
      sponsorBlock: false,
      splitChaptersVideo: false,
      entirePlaylist: false,
      audio: false,
      splitChaptersAudio: false,
    });
    setOptions(false);
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
              <input
                type="checkbox"
                checked={contextData.sponsorBlock}
                onChange={() => handleToggle('sponsorBlock')}
              />
              <span className="slider round"></span>
            </label>

            <label className="switch">
              Split chapters into videos
              <input
                type="checkbox"
                checked={contextData.splitChaptersVideo}
                onChange={() => handleToggle('splitChaptersVideo')}
              />
              <span className="slider round"></span>
            </label>

            <label className="switch">
              Entire Playlist
              <input
                type="checkbox"
                checked={contextData.entirePlaylist}
                onChange={() => handleToggle('entirePlaylist')}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="rightColum">
            <label className="switch">
              Audio Only
              <input
                type="checkbox"
                checked={contextData.audio}
                onChange={() => handleToggle('audio')}
              />
              <span className="slider round"></span>
            </label>
            <label className="switch">
              Split chapters into tracks
              <input
                type="checkbox"
                checked={contextData.splitChaptersAudio}
                onChange={() => handleToggle('splitChaptersAudio')}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default Options;
