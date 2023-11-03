export default {
  selector: "input[type='checkbox'], input[type='radio']",
  keyPrefix: 'check',
  eventName: 'change',
  cb: (event: any) => ({
    isChecked: event.target.checked,
    value: event.target.value,
    type: event.target.type,
  }),
};
