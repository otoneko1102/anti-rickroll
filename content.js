const rickrollVideos = new Set([
  "dQw4w9WgXcQ",
  "oHg5SJYRHA0",
  "vli-PebUUjo",
  "GtL1huin9EE",
  "AuKR2fQbMBk",
  "OVHVsNjyKdk",
  "XGxIE1hr0w4",
  "fMCN-b0ic_k",
  "hvL1339luv0",
  "xvFZjo5PgG0",
  "H8ZH_mkfPUY",
  "1iqyYitzTuw",
  "lpiB2wMc49g",
  "YdOsjhNLSd8",
  "hdxYROhhgVE",
  "0k7BvzQRrOI"
]);

function getVideoId(url) {
  try {
    return new URL(url).searchParams.get("v");
  } catch {
    return null;
  }
}

function isRickroll(videoId) {
  return rickrollVideos.has(videoId);
}

function antiRickroll(videoId) {
  if (sessionStorage.getItem("rickroll-continue") === "true") {
    sessionStorage.removeItem("rickroll-continue");
    return;
  }

  document.body.innerHTML = `
    <div class="rickroll-warning">
      <h1 class="rickroll-text">${chrome.i18n.getMessage('Warning')}</h1>
      <button id="ar-close">${chrome.i18n.getMessage('Exit')}</button>
      <button id="ar-continue">${chrome.i18n.getMessage('Continue')}</button>
    </div>
  `;

  document.getElementById("ar-close").onclick = () => window.close();
  document.getElementById("ar-continue").onclick = () => {
    sessionStorage.setItem("rickroll-continue", "true");
    location.reload();
  };
}

const videoId = getVideoId(location.href);
if (videoId && isRickroll(videoId)) {
  antiRickroll(videoId);
}
