import commonListener from './commonListener';
import typeListener from './typeListener';

type CreatePropsType = { selector: string, keyPrefix: string, eventName: string, cb: any }
const listenerMap: any = {
  keydown: typeListener,
};

const create = ({
  selector, keyPrefix, eventName, cb,
}: CreatePropsType) => {
  const inputElements = document.querySelectorAll(selector);
  return [...inputElements].map((inputElement: any) => {
    const fn = (event: any) => {
      const listener = listenerMap[eventName];
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

const createListener = (events: any) => events.map((event: any) => create(event)).flat(1);

export default createListener;
