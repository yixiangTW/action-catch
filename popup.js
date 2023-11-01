console.log("This is a popup!")

const btn = document.querySelector('#listen')
const exportBtn = document.querySelector('#export')

let isListen = false

const getTabId = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      resolve(tabs[0].id)
    })
  })
}


btn.addEventListener('click', async () => {
  if(isListen) {
    alert('Listened')
    return
  }
  isListen = true
  const tabId = await getTabId()
  chrome.action.setBadgeText({
    text: "ON",
  });
  // chrome.scripting.executeScript({
  //   target : {tabId : tabId},
  //   files: ['./public/main.js'],
    
  // })
})


exportBtn.addEventListener('click', async () => {
  const tabId = await getTabId()
  chrome.tabs.sendMessage(tabId, { message: 'export' });
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // 处理来自 main.js 的回复消息
  if(request.message === 'data') {
    console.log(request.data)
  }
});