chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "muteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: true });
  }
  if (message.action === "unmuteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: false });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://anti-rickroll.commonjs.work" });
  }

  if (details.reason === "update") {
    chrome.tabs.create({ url: "https://anti-rickroll.commonjs.work" });
  }

  chrome.storage.local.get({ ignoreList: [] }, (data) => {
    if (!data.ignoreList) {
      chrome.storage.local.set({ ignoreList: [] });
    }
  });
});
