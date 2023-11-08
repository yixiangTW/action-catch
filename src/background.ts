const initExtension = () => {
  chrome.storage.sync.set({ listen: false });
  chrome.storage.sync.set({ record: false });
  chrome.storage.sync.set({ ctx: {} });
};

chrome.runtime.onInstalled.addListener(initExtension);
chrome.tabs.onRemoved.addListener(initExtension);

chrome.webNavigation.onCommitted.addListener(() => {
  chrome.storage.sync.set({ listen: false });
});
