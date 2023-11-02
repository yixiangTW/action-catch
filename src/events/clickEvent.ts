export default {
  selector: "button, a, img, input[type='button'], input[type='submit']",
  keyPrefix: 'click',
  eventName: 'click',
  cb: (element: any) => ({
    content: element.innerText,
  }),
};
