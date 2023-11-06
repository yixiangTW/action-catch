import startListen from './listener';
import { getCtx } from './util/chrome';
import { log } from './util/index';

let allCreatedListeners: any = null;

setTimeout(() => {
  log('Created all listeners');
  allCreatedListeners = startListen();
});

const removeListen = () => {
  log('Destroyed all listeners');
  allCreatedListeners.map((fn: any) => fn());
};

const setCtxToPopup = async () => {
  log('Printed all records');
  const ctx = await getCtx();
  log(ctx);
  chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    setCtxToPopup();
  } else if (request.message === 'clear') {
    chrome.storage.sync.set({ ctx: {} });
  } else if (request.message === 'unlisten') {
    removeListen();
  }
});
