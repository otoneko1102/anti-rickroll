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
  "0k7BvzQRrOI",
]);

const session = sessionStorage;
const currentURL = location.href;

function getVideoId(url) {
  const idx = url.indexOf("?v=");
  if (idx === -1) return null;
  const endIdx = url.indexOf("&", idx);
  return endIdx === -1
    ? url.substring(idx + 3)
    : url.substring(idx + 3, endIdx);
}

function stopAllVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.src = "";
  });
}

function muteTab() {
  chrome.runtime.sendMessage({ action: "muteTab" });
}

function unmuteTab() {
  chrome.runtime.sendMessage({ action: "unmuteTab" });
}

function antiRickroll() {
  if (session.getItem("rickroll-continue")) {
    session.removeItem("rickroll-continue");
    unmuteTab();
    return;
  }

  muteTab();
  stopAllVideos();

  document.body.innerHTML = `
      <div class="rickroll-warning">
        <h1 class="rickroll-text">${chrome.i18n.getMessage("Warning")}</h1>
        <button id="ar-close">${chrome.i18n.getMessage("Exit")}</button>
        <button id="ar-continue">${chrome.i18n.getMessage("Continue")}</button>
      </div>
    `;

  document.getElementById("ar-close").onclick = () => {
    window.close();
  };
  document.getElementById("ar-continue").onclick = () => {
    session.setItem("rickroll-continue", "true");
    location.reload();
  };
}

const videoId = getVideoId(currentURL);
videoId && rickrollVideos.has(videoId) && antiRickroll();
