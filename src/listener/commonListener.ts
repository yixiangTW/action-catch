import { getElementXPath, log, getActionKey } from '../util';
import EventType from '../models/EventType';
import { getCtx } from '../util/chrome';

const handleCommon = (event: any, cb: any, keyPrefix: string, eventName: string) => {
  const element = event.target;
  const xPath = getElementXPath(element);
  chrome.storage.sync.get('record', async (result) => {
    console.log(result.record);
    if (result.record) {
      const arg = {
        xPath,
        ...cb(event),
      };
      const ctx: any = await getCtx();
      ctx[getActionKey(keyPrefix)] = new EventType(arg);

      log(`Inserted ${eventName} event record`);
      chrome.storage.sync.set({ ctx });
    }
  });
};

export default handleCommon;
