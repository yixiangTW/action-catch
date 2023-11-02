import './listener';
import ctx from './models';

console.log(ctx);

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
  }
  if (request.message === 'clear') {
    ctx.clear();
  }
});
