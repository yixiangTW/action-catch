export default {
  selector: "input[type='text'], input[type='password'], input:not([type]), textarea",
  keyPrefix: 'type',
  eventName: 'change',
  cb: (element: any) => ({
    value: element.value,
  }),
};
