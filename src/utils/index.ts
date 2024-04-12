export const isObject = (data: unknown) =>
  Object.prototype.toString.call(data) === '[object Object]';
export const isArray = (data: unknown) => Object.prototype.toString.call(data) === '[object Array]';
