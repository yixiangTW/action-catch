import { getCurrentListenStatus, getTabId } from './util/chrome'
import { exportToJsonFile } from './util'

const listenBtn = document.querySelector('#listen') as Element
const exportBtn = document.querySelector('#export') as Element
const title = document.querySelector('h1') as HTMLHeadingElement


(async () => {
  const isListen = await getCurrentListenStatus()
  title.innerText = isListen ? 'ON' : 'OFF'
})()

listenBtn.addEventListener('click', async () => {
  const isListen = await getCurrentListenStatus()
  handleToggleListen(!isListen)
})

const handleToggleListen = async (isListen: boolean) => {
  title.innerText = isListen ? 'ON' : 'OFF'
  chrome.action.setBadgeText({
    text: isListen ? "ON" : 'OFF',
  });
  chrome.storage.sync.set({listen: isListen})
}

exportBtn.addEventListener('click', async () => {
  const tabId = await getTabId()
  if(!tabId) {
    return
  }
  chrome.tabs.sendMessage(tabId, { message: 'export' });
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 处理来自 main.js 的回复消息
  if(request.message === 'data') {
    exportToJsonFile(request.data, 'data.json')
    console.log(request.data)
  }
});