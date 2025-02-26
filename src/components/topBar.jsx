import '../css/topBar.css';

function topBar() {
  return (
    <div className="topBar">
      <div className="container">
        <a className="title">YT-DLP</a>
        <a>Github</a>
        <a href="https://github.com/acidburnmonkey/yt-dlp-Docker">
          <img src="github.svg" alt="Github Repo" width="32" height="32" />
        </a>
      </div>
    </div>
  );
}

export default topBar;
