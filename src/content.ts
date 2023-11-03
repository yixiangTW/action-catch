import startListen from './listener';
import { getCtx } from './util/chrome';
import { log } from './util/index';

startListen();

const setCtxToPopup = async () => {
  log('Printing record');
  const ctx = await getCtx();
  log(ctx);
  log('Over');
  chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    setCtxToPopup();
  } else if (request.message === 'clear') {
    chrome.storage.sync.set({ ctx: {} });
  }
});
