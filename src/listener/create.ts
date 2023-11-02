import { getElementXPath } from '../util';
import EventType from '../models/EventType';
import ctx from '../models';

type Props = {selector: string, keyPrefix: string, eventName: string, cb: any}
const create = ({
  selector, keyPrefix, eventName, cb,
}: Props) => {
  const inputElements = document.querySelectorAll(selector);
  const getActionKey = () => `${keyPrefix}-${new Date().getTime()}`;

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener(eventName, (event: any) => {
      const element = event.target;
      const xPath = getElementXPath(element);
      chrome.storage.sync.get('listen', (result) => {
        if (result.listen) {
          const arg = {
            xPath,
            ...cb(element),
          };
          ctx.set(getActionKey(), new EventType(arg));
        }
      });
    });
  });
};

const createListener = (events: any) => {
  events.map((event: any) => create(event));
};

export default createListener;
