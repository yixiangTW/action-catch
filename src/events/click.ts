import { getElementXPath } from '../util';
import TypeEvent from '../models/TypeEvent';
import ctx from '../models/ctx';

const inputElements = document.querySelectorAll("button, a, img, input[type='button']");

let actionIndex = -1;
const getActionKey = () => {
  actionIndex += 1;
  return `click-${actionIndex}`;
};

inputElements.forEach((inputElement) => {
  inputElement.addEventListener('click', (event: Event) => {
    const element = event.target as HTMLInputElement;
    const xPath = getElementXPath(element);
    chrome.storage.sync.get('listen', (result) => {
      if (result.listen) {
        ctx.set(getActionKey(), new TypeEvent({
          xPath,
          content: element.innerText,
        }));
      }
    });
  });
});
