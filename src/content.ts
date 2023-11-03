import startListen from './listener';
import { getCtx } from './util/chrome';

startListen();

const setCtxToPopup = async () => {
  const ctx = await getCtx();
  chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    setCtxToPopup();
  } else if (request.message === 'clear') {
    chrome.storage.sync.set({ ctx: {} });
  }
});
