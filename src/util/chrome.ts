export const getCurrentListenStatus = () => {
  return new Promise<number>(resolve => {
    chrome.storage.sync.get('listen', (result) => {
      resolve(result.listen)
    })
  })
}

export const getTabId = () => {
  return new Promise<number | undefined>((resolve) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      resolve(tabs[0].id)
    })
  })
}
