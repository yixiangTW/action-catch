//@ts-ignore
function getElementXPath(element) {
  if (element && element.id) {
    // 如果元素有ID，可以直接使用ID来构建XPath
    return `id("${element.id}")`;
  } else {
    // 否则，需要根据元素的标签名和位置逐级构建XPath
    const segments = [];
    let current = element;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      for (let sibling = current.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === current.tagName) {
          index++;
        }
      }
      const tagName = current.tagName.toLowerCase();
      const segment = `${tagName}[${index}]`;
      segments.unshift(segment);
      current = current.parentNode;
    }
    return `/${segments.join('/')}`;
  }
}

export {
  getElementXPath
}