const initExtension = () => {
  chrome.storage.sync.set({ listen: false });
  chrome.storage.sync.set({ record: false });
  chrome.storage.sync.set({ ctx: {} });
};

chrome.runtime.onInstalled.addListener(initExtension);
chrome.tabs.onRemoved.addListener(initExtension);

chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.transitionType === 'reload') {
    chrome.storage.sync.set({ listen: false });
  }
});
