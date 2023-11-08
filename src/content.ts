import startListen from './listener';
import { getCtx } from './util/chrome';
import { log, removeLastProperty } from './util/index';

let allCreatedListeners: any = null;

const addRecord = () => {
  log('Started record');
  chrome.storage.sync.set({ record: true });
  chrome.runtime.sendMessage({ message: 'record', data: true });
};

const removeRecord = () => {
  log('Stoped record');
  chrome.storage.sync.set({ record: false });
  chrome.runtime.sendMessage({ message: 'record', data: false });
};

const addListen = () => {
  log('Created all listeners');
  allCreatedListeners = startListen();
  chrome.runtime.sendMessage({ message: 'listen', data: true });
};

const removeListen = () => {
  log('Destroyed all listeners');
  allCreatedListeners.map((fn: any) => fn());

  chrome.runtime.sendMessage({ message: 'listen', data: false });
};

const setCtxToPopup = async () => {
  log('Printed all records');
  const ctx = await getCtx();
  log(ctx);
  chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
};

const clearPreviousStep = async () => {
  log('Cleared previous step record');
  const ctx = await getCtx();
  chrome.storage.sync.set({ ctx: removeLastProperty(ctx) });
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
  } else if (request.message === 'record') {
    addRecord();
  } else if (request.message === 'unrecord') {
    removeRecord();
  } else if (request.message === 'clear_previous_step') {
    clearPreviousStep();
  }
});
