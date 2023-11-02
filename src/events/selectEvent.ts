export default {
  selector: 'select',
  keyPrefix: 'select',
  eventName: 'change',
  cb: (element: any) => ({
    value: element.value,
    content: element.options[element.selectedIndex].text,
  }),
};
