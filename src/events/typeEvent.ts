export default {
  selector: "input[type='text'], input[type='password'], input[type='number'], input:not([type]), textarea",
  keyPrefix: 'type',
  eventName: 'keydown',
  cb: (event: any) => {
    const isEnter = event.key === 'Enter';
    return {
      value: event.target.value,
      isEnter,
    };
  },
};
