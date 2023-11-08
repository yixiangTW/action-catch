import { getVisibleText } from '../util';

export default {
  selector: "button, a, img, input[type='button'], input[type='submit']",
  keyPrefix: 'click',
  eventName: 'click',
  cb: (event: any) => ({
    content: getVisibleText(event.target),
  }),
};
