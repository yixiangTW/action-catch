export default {
  selector: "input[type='text'], input[type='password'], input:not([type]), textarea",
  keyPrefix: 'type',
  eventName: 'change', // enter enter key emit or lost focus
  cb: (event: any) => ({
    value: event.target.value,
  }),
};
