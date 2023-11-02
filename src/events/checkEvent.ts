export default {
  selector: "input[type='checkbox'], input[type='radio']",
  keyPrefix: 'check',
  eventName: 'change',
  cb: (element: any) => ({
    isChecked: element.checked,
    value: element.value,
    type: element.type,
  }),
};
