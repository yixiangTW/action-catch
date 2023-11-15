import { getElementXPath, log, getActionKey } from '../util';
import EventType from '../models/EventType';
import { getCtx } from '../util/chrome';

import { ListenerType } from '../types/listener';

const commonListener: ListenerType = (event, cb, keyPrefix, eventName) => {
  const element = event.target;
  const id = (event?.target as HTMLElement)?.id;
  const xPath = getElementXPath(element);
  chrome.storage.sync.get('record', async (result) => {
    if (result.record) {
      const arg = {
        id,
        xPath,
        ...(cb ? cb(event) : {}),
      };
      const ctx = await getCtx();
      ctx[getActionKey(keyPrefix)] = new EventType(arg);

      log(`Inserted ${eventName} event record`);
      chrome.storage.sync.set({ ctx });
    }
  });
};

export default commonListener;
