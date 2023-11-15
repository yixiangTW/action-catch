import startListen from './listener';
import { getCtx } from './util/chrome';
import exchangeCtxToCypress from './cypress';
import { log, removeLastProperty } from './util/index';

import { RemoveEventListener, HandleFromPopupMapType, PopupMessage } from './types/listener';

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

const generateCypressCase = async () => {
  log('Printed Cypress case');
  const ctx = await getCtx();
  const data = exchangeCtxToCypress(ctx);
  log(data);
  chrome.runtime.sendMessage({ message: 'cypress_data', data });
};

const handleFromPopupMap: HandleFromPopupMapType = {
  export: setCtxToPopup,
  clear,
  unlisten: removeListen,
  listen: addListen,
  record: addRecord,
  unrecord: removeRecord,
  clear_previous_step: clearPreviousStep,
  export_cypress: generateCypressCase,
};

chrome.runtime.onMessage.addListener((request) => {
  const { message } = request;
  handleFromPopupMap[message as PopupMessage]();
});

// const autoRelisten = () => {
//   if (allRemoveListeners) {
//     allRemoveListeners.map((fn) => fn());
//   }
//   chrome.storage.sync.set({ listen: true });
//   allRemoveListeners = startListen();
// };

// let interval = 0;
// const startAutoRelisten = () => {
//   interval = setInterval(() => {
//     autoRelisten();
//   }, 1500);
// };
// log('Entering the current tab, start listening.');
// startAutoRelisten();

// function handleVisibilityChange() {
//   if (document.hidden) {
//     log('Leaving the current tab, stop listening.');
//     clearInterval(interval);
//     removeListen();
//   } else {
//     log('Entering the current tab, resume listening.');
//     startAutoRelisten();
//   }
// }

// document.addEventListener('visibilitychange', handleVisibilityChange);
// window.addEventListener('beforeunload', () => {
//   removeListen();
//   document.removeEventListener('visibilitychange', handleVisibilityChange);
// });
