const colorSelector = document.querySelector('#color')

colorSelector.addEventListener('change', (e) => {
  chrome.storage.sync.set({ color: e.target.value })
})
