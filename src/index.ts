// chrome.storage.sync.get('color', async (data) => {

//   document.body.style.backgroundColor = data.color
// })


import './events/check'
import ctx from './models'

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'export') {
    chrome.runtime.sendMessage({ message: 'data', data: JSON.stringify(ctx) });
  }
});
