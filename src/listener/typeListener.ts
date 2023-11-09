import {
  debounce, getElementXPath, log, getActionKey,
} from '../util';
import EventType from '../models/EventType';
import { getCtx } from '../util/chrome';

import { ListenerType } from '../types/listener';
import { Ctx } from '../types/model';

const save = debounce((ctx: Ctx) => {
  log('Inserted type event record');
  chrome.storage.sync.set({ ctx });
}, 1000);

const typeListener: ListenerType = (event, cb, keyPrefix) => {
  const element = event.target;
  const xPath = getElementXPath(element);
  chrome.storage.sync.get('record', async (result) => {
    if (result.record) {
      const arg = {
        xPath,
        ...(cb ? cb(event) : {}),
      };
      const ctx = await getCtx();
      ctx[getActionKey(keyPrefix)] = new EventType(arg);
      save(ctx);
    }
  });
};

export default typeListener;
