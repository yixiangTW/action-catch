import { getElementXPath } from '../util'
import CheckEvent from '../models/CheckEvent'
import ctx from '../models/'

const inputElements = document.querySelectorAll("input[type='checkbox'], input[type='radio']");

console.log(inputElements)

inputElements.forEach(inputElement => {
  inputElement.addEventListener("change", (event: Event) => {
    const element = event.target  as HTMLInputElement;
    const isChecked = element.checked;
    const xPath = getElementXPath(element);



    const e = new CheckEvent({
      isChecked,
      xPath,
      name: element.name,
      type: element.type
    })
    ctx.set('123', e)
    console.log(`元素的类型: ${element.type}`);
    console.log(`元素的名称: ${element.name}`);
    console.log(`是否选中: ${isChecked}`);
    console.log(`元素的XPath: ${xPath}`);
    return 
  });
});
