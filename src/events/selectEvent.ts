export default {
  selector: 'select',
  keyPrefix: 'select',
  eventName: 'change',
  cb: (event: any) => ({
    value: event.target.value,
    content: event.target.options[event.target.selectedIndex].text,
  }),
};
