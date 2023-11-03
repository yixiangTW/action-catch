import startListen from './listener';
import { getCtx } from './util/chrome';

startListen();

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.message === 'export') {
    const ctx = await getCtx();
    console.log(ctx);
    chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
  }
  if (request.message === 'clear') {
    chrome.storage.sync.set({ ctx: {} });
  }
});
