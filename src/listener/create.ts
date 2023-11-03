import { getElementXPath, log } from '../util';
import EventType from '../models/EventType';
import { getCtx } from '../util/chrome';

type Props = {selector: string, keyPrefix: string, eventName: string, cb: any}
const create = ({
  selector, keyPrefix, eventName, cb,
}: Props) => {
  const inputElements = document.querySelectorAll(selector);
  const getActionKey = () => `${new Date().getTime()}-${keyPrefix}`;

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener(eventName, (event: any) => {
      const element = event.target;
      const xPath = getElementXPath(element);
      chrome.storage.sync.get('listen', async (result) => {
        if (result.listen) {
          const arg = {
            xPath,
            ...cb(event),
          };
          const ctx: any = await getCtx();
          ctx[getActionKey()] = new EventType(arg);

          log(`Insert ${eventName} record`);
          chrome.storage.sync.set({ ctx });
        }
      });
    });
  });
};

const createListener = (events: any) => {
  events.map((event: any) => create(event));
};

export default createListener;
