// similar to console.table
const table = (contentObject, attributesObject = {}) => {
  const allHeaders = Object.entries(contentObject).reduce(
    (headers, [index, value]) => [
      ...new Set([...headers, ...Object.keys(value)]),
    ],
    []
  );

  const tableHeaders = allHeaders.reduce(
    (acc, header) => acc + `<th>${header}</th>`,
    '<th></th>'
  );

  const tableBody = Object.entries(contentObject).reduce(
    (body, [index, keyValuePair]) => {
      const cells = allHeaders.reduce(
        (acc, header) => `${acc}<td>${keyValuePair[header] ?? ''}</td>`,
        `<td>${index}</td>`
      );
      return `${body}\n<tr>${cells}</tr>`;
    },
    ''
  );

  const attributes = Object.entries(attributesObject).reduce(
    (acc, [attributesName, attributeValue]) =>
      `${acc} ${attributesName}="${attributeValue}"`,
    ''
  );

  return [
    `<table${attributes}>`,
    `<tr>${tableHeaders}</tr>`,
    `${tableBody}`,
    '</table>',
  ].join('\n');
};

module.exports = { table };
