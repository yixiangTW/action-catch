import './events';
import ctx from './models/ctx';

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'export') {
    chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
  }
});
