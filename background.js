chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "muteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: true });
  }
  if (message.action === "unmuteTab" && sender.tab) {
    chrome.tabs.update(sender.tab.id, { muted: false });
  }
});
