const initExtension = () => {
  // chrome.action.setBadgeText({
  //   text: 'OFF',
  // });
  chrome.storage.sync.set({ listen: false });
  chrome.storage.sync.set({ ctx: {} });
};

chrome.runtime.onInstalled.addListener(initExtension);
chrome.tabs.onRemoved.addListener(initExtension);
