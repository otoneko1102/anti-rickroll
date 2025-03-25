const rickrollVideos = new Set([
  "0k7BvzQRrOI",
  "1iqyYitzTuw",
  "5fxtRXnNWiA",
  "6omHDfHITZ4",
  "6sgTX46aWAM",
  "AuKR2fQbMBk",
  "cvh0nX08nRw",
  "dmA6_0ZwWb4",
  "doEqUhFiQS4",
  "dQw4w9WgXcQ",
  "ds9xMnFJC50",
  "fMCN-b0ic_k",
  "GtL1huin9EE",
  "H8ZH_mkfPUY",
  "hdxYROhhgVE",
  "hvL1339luv0",
  "IO9XlQrEt2Y",
  "LLFhKaqnWwk",
  "lpiB2wMc49g",
  "moZtoMP7HAA",
  "NiAOAhFCEuQ",
  "nsCIeklgp1M",
  "OVHVsNjyKdk",
  "oHg5SJYRHA0",
  "PayvWj2piKg",
  "Svj1bZz2mXw",
  "Ux0YNqhaw0I",
  "vli-PebUUjo",
  "w2Sz_yClQyI",
  "XGxIE1hr0w4",
  "xvFZjo5PgG0",
  "YdOsjhNLSd8",
]);

function getVideoId(url) {
  const idx = url.indexOf("?v=");
  if (idx === -1) return null;
  const endIdx = url.indexOf("&", idx);
  return endIdx === -1
    ? url.substring(idx + 3)
    : url.substring(idx + 3, endIdx);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "muteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: true });
  }
  if (message.action === "unmuteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: false });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const videoId = getVideoId(tab.url);
    if (videoId && rickrollVideos.has(videoId)) {
      chrome.tabs.update(tabId, { muted: true });
    }
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://anti-rickroll.commonjs.work" });
  }

  if (details.reason === "update") {
    // chrome.tabs.create({ url: "https://anti-rickroll.commonjs.work" });
  }
});
