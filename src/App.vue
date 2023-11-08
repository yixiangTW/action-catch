<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentRecordStatus, getTabId, getCurrentListenStatus } from './util/chrome';
import { exportToJsonFile } from './util';


const listenStatus = ref(false);
const recordStatus = ref(false);

onMounted(() => {
  getState()
})

const getState = async () => {
  const isRecord = await getCurrentRecordStatus();
  const isListen = await getCurrentListenStatus();
  listenStatus.value = isListen;
  recordStatus.value = isRecord
};

const sentMessageToContent = async (message: string) => {
  const tabId = await getTabId();
  if (!tabId) {
    return;
  }
  chrome.tabs.sendMessage(tabId, { message });
}
const handleToggleListen = () => {
  if(listenStatus.value) {
    sentMessageToContent('unlisten');
    Promise.resolve().then(() => sentMessageToContent('listen'));
  } else {
    sentMessageToContent('listen');
  }

  // sentMessageToContent(!listenStatus.value ? 'listen' : 'unlisten')
}

const handleRecordListen = () => {
  sentMessageToContent(!recordStatus.value ? 'record' : 'unrecord')
}

const handleClearPreStep = async () => {
  sentMessageToContent('clear_previous_step');
}

const handleClear = async () => {
  sentMessageToContent('clear');
}

const handleExport = async () => {
  sentMessageToContent('export')
}

const respondRecordStatus = async (isRecord: boolean) => {
  chrome.storage.sync.set({ record: isRecord });
  getState();
}

const respondListenStatus = (isListen: boolean) => {
  chrome.storage.sync.set({ listen: isListen });
  getState();
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'data') {
    exportToJsonFile(request.data, 'data.json');
  } else if (request.message === 'listen') {
    respondListenStatus(request.data);
  } else if (request.message === 'record') {
    respondRecordStatus(request.data);
  }
});


</script>

<template>
  <div id="chrome-extension-catch-container">
    <h5 id="listen-status">Listen status: <span :id="listenStatus ? 'listen-active' : 'listen-dead'">{{ listenStatus }}</span></h5>
    <h5 id="record-status">Record status: <span :id="recordStatus ? 'record-active' : 'record-dead'">{{ recordStatus }}</span></h5>
    <button @click="handleToggleListen">{{ listenStatus ? 'Relisten' : 'Listen' }}</button>
    <button @click="handleRecordListen">{{  recordStatus ? 'Unrecord' : 'Record' }}</button>
    <button @click="handleClearPreStep">Clear Pre Step</button>
    <button @click="handleClear">Clear All</button>
    <button @click="handleExport">Export</button>
  </div>

</template>
