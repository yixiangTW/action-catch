import commonListener from './commonListener';
import typeListener from './typeListener';
import { flatOne } from '../util';

import { CreateListenerType, CreateType, SupportListenersType } from '../types/listener';

const supportListeners: SupportListenersType = {
  keydown: typeListener,
};

const create: CreateType = (props) => {
  const {
    selector,
    keyPrefix,
    eventName,
    cb,
  } = props;
  const inputElements = document.querySelectorAll(selector);
  return [...inputElements].map((inputElement) => {
    const fn = (event: any) => {
      const listener = supportListeners[eventName];
      if (listener) {
        listener(event, cb, keyPrefix);
        return;
      }
      commonListener(event, cb, keyPrefix, eventName);
    };

    inputElement.addEventListener(eventName, fn);

    return () => {
      inputElement.removeEventListener(eventName, fn);
    };
  });
};

// eslint-disable-next-line max-len
const createListener: CreateListenerType = (events) => flatOne(events.map((event) => create(event)));

export default createListener;
