import { Ctx } from '../types/model';

export const getCurrentListenStatus = () => new Promise<boolean>((resolve) => {
  chrome.storage.sync.get('listen', (result) => {
    resolve(result.listen);
  });
});

export const getCurrentRecordStatus = () => new Promise<boolean>((resolve) => {
  chrome.storage.sync.get('record', (result) => {
    resolve(result.record);
  });
});

export const getTabId = () => new Promise<number | undefined>((resolve) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    resolve(tabs[0].id);
  });
});

export const getCtx = () => new Promise<Ctx>((resolve) => {
  chrome.storage.sync.get('ctx', (data) => {
    resolve((data.ctx));
  });
});
