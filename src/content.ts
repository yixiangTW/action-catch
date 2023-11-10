import startListen from './listener';
import { getCtx } from './util/chrome';
import { log, removeLastProperty } from './util/index';

import { RemoveEventListener } from './types/listener';

let allRemoveListeners: RemoveEventListener[];

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
  allRemoveListeners = startListen();
  chrome.runtime.sendMessage({ message: 'listen', data: true });
};

const removeListen = () => {
  log('Destroyed all listeners');
  if (allRemoveListeners) {
    allRemoveListeners.map((fn) => fn());
  }
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

const autoRelisten = () => {
  if (allRemoveListeners) {
    allRemoveListeners.map((fn) => fn());
  }
  chrome.storage.sync.set({ listen: true });
  allRemoveListeners = startListen();
};

setInterval(() => {
  autoRelisten();
}, 1500);
