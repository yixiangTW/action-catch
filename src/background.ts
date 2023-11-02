const initExtension = () => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
  chrome.storage.sync.set({listen: false})
}


chrome.runtime.onInstalled.addListener(initExtension);
chrome.webNavigation.onCommitted.addListener(initExtension);
