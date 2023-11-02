import { getElementXPath } from '../util';
import TypeEvent from '../models/TypeEvent';
import ctx from '../models/ctx';

const inputElements = document.querySelectorAll("input[type='checkbox'], input[type='radio']");

let actionIndex = -1;
const getActionKey = () => {
  actionIndex += 1;
  return `change-${actionIndex}`;
};

inputElements.forEach((inputElement) => {
  inputElement.addEventListener('change', (event: Event) => {
    const element = event.target as HTMLInputElement;
    const isChecked = element.checked;
    const xPath = getElementXPath(element);

    chrome.storage.sync.get('listen', (result) => {
      if (result.listen) {
        ctx.set(getActionKey(), new TypeEvent({
          isChecked,
          xPath,
          name: element.name,
          type: element.type,
        }));
      }
    });
  });
});
