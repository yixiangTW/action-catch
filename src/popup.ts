import { getCurrentRecordStatus, getTabId, getCurrentListenStatus } from './util/chrome';
import { exportToJsonFile } from './util';

const listenBtn = document.querySelector('#listen') as Element;
const recordBtn = document.querySelector('#record') as Element;
const exportBtn = document.querySelector('#export') as Element;
const listenSpan = document.querySelector('#listen-status span') as HTMLHeadingElement;
const recordSpan = document.querySelector('#record-status span') as HTMLHeadingElement;
const clearBtn = document.querySelector('#clear') as Element;

const refreshPopPage = async () => {
  const isRecord = await getCurrentRecordStatus();
  const isListen = await getCurrentListenStatus();
  listenSpan.innerText = isListen ? 'ON' : 'OFF';
  recordSpan.innerText = isRecord ? 'ON' : 'OFF';
};

refreshPopPage();

const handleToggleRecordStatus = async (isRecord: boolean) => {
  chrome.storage.sync.set({ record: isRecord });
  refreshPopPage();
};

const handleToggleListenStatus = async (isListen: boolean) => {
  chrome.storage.sync.set({ listen: isListen });
  refreshPopPage();
};

listenBtn.addEventListener('click', async () => {
  const tabId = await getTabId();
  if (!tabId) {
    return;
  }
  const isListen = await getCurrentListenStatus();
  chrome.tabs.sendMessage(tabId, { message: !isListen ? 'listen' : 'unlisten' });
});

recordBtn.addEventListener('click', async () => {
  const isRecord = await getCurrentRecordStatus();
  handleToggleRecordStatus(!isRecord);
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

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'data') {
    exportToJsonFile(request.data, 'data.json');
  } else if (request.message === 'listen done') {
    handleToggleListenStatus(true);
  } else if (request.message === 'unlisten done') {
    handleToggleListenStatus(false);
  }
});
