import { getCurrentListenStatus, getTabId } from './util/chrome';
import { exportToJsonFile } from './util';

const listenBtn = document.querySelector('#listen') as Element;
const exportBtn = document.querySelector('#export') as Element;
const title = document.querySelector('span') as HTMLHeadingElement;
const unListenBtn = document.querySelector('#UnListen') as Element;
const clearBtn = document.querySelector('#clear') as Element;

(async () => {
  const isListen = await getCurrentListenStatus();
  title.innerText = isListen ? 'ON' : 'OFF';
})();

const handleToggleListen = async (isListen: boolean) => {
  const listenStatus = isListen ? 'ON' : 'OFF';
  title.innerText = listenStatus;
  // chrome.action.setBadgeText({
  //   text: listenStatus,
  // });
  chrome.storage.sync.set({ listen: isListen });
};

listenBtn.addEventListener('click', async () => {
  const isListen = await getCurrentListenStatus();
  handleToggleListen(!isListen);
});

exportBtn.addEventListener('click', async () => {
  const tabId = await getTabId();
  if (!tabId) {
    return;
  }
  chrome.tabs.sendMessage(tabId, { message: 'export' });
});

clearBtn.addEventListener('click', async () => {
  const tabId = await getTabId();
  if (!tabId) {
    return;
  }
  chrome.tabs.sendMessage(tabId, { message: 'clear' });
});

unListenBtn.addEventListener('click', async () => {
  const tabId = await getTabId();
  if (!tabId) {
    return;
  }
  chrome.tabs.sendMessage(tabId, { message: 'unlisten' });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'data') {
    exportToJsonFile(request.data, 'data.json');
  }
});
