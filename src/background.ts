const initExtension = () => {
  chrome.storage.sync.set({ listen: false });
  chrome.storage.sync.set({ record: false });
  chrome.storage.sync.set({ ctx: {} });
};

chrome.runtime.onInstalled.addListener(initExtension);
chrome.tabs.onRemoved.addListener(initExtension);

// 手动监听的逻辑，先不删
chrome.webNavigation.onCommitted.addListener(() => {
  chrome.storage.sync.set({ listen: false });
});
