const log = (content: string | object) => {
  if (typeof content === 'object') {
    console.log(`%c${JSON.stringify(content, null, 2)} ---from extension`, 'color: black; font-size: 10px; padding: 5px; background: #87CEEB;');
  } else {
    console.log(`%c${content} ---from extension`, 'color: white; font-size: 10px; padding: 5px; background: green;');
  }
};

function getElementXPath(element: any) {
  if (element && element.id) {
    // 如果元素有ID，可以直接使用ID来构建XPath
    return `id("${element.id}")`;
  }
  // 否则，需要根据元素的标签名和位置逐级构建XPath
  const segments = [];
  let current = element;
  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let index = 1;
    for (let sibling = current.previousSibling; sibling; sibling = sibling.previousSibling) {
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === current.tagName) {
        index += 1;
      }
    }
    const tagName = current.tagName.toLowerCase();
    const segment = `${tagName}[${index}]`;
    segments.unshift(segment);
    current = current.parentNode;
  }
  return `/${segments.join('/')}`;
}

function exportToJsonFile(jsonObject: any, filename: any) {
  // 将 JSON 数据转换为字符串
  const jsonString = jsonObject;

  // 创建一个包含 JSON 字符串的 Blob 对象
  const blob = new Blob([jsonString], { type: 'application/json' });

  // 创建一个指向 Blob 对象的 URL
  const url = URL.createObjectURL(blob);

  // 创建一个 <a> 元素用于下载 JSON 文件
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // 模拟点击链接以触发下载
  a.click();

  // 释放 URL 和 Blob 对象
  URL.revokeObjectURL(url);
}

export {
  log,
  getElementXPath,
  exportToJsonFile,
};
