import startListen from './listener';
import { getCtx } from './util/chrome';
import { log } from './util/index';

let allCreatedListeners: any = null;

const addListen = () => {
  log('Created all listeners');
  allCreatedListeners = startListen();
  chrome.runtime.sendMessage({ message: 'listen done' });
};

const removeListen = () => {
  log('Destroyed all listeners');
  allCreatedListeners.map((fn: any) => fn());

  chrome.runtime.sendMessage({ message: 'unlisten done' });
};

const setCtxToPopup = async () => {
  log('Printed all records');
  const ctx = await getCtx();
  log(ctx);
  chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
};

const clear = () => {
  log('Cleared all records');
  chrome.storage.sync.set({ ctx: {} });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    setCtxToPopup();
  } else if (request.message === 'clear') {
    clear();
  } else if (request.message === 'unlisten') {
    removeListen();
  } else if (request.message === 'listen') {
    addListen();
  }
});
