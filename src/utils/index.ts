import Clipboard from 'clipboard';
export const isObject = (data: unknown) =>
  Object.prototype.toString.call(data) === '[object Object]';
export const isArray = (data: unknown) => Object.prototype.toString.call(data) === '[object Array]';

export const copyText = (txt = '') => {
  return new Promise((resolve, reject) => {
    const fakeEl = document.createElement('button');
    const clipboard = new Clipboard(fakeEl, {
      text() {
        return txt;
      },
      action() {
        return 'copy';
      },
      container: document.body,
    });
    clipboard.on('success', e => {
      clipboard.destroy();
      resolve(e);
    });
    clipboard.on('error', e => {
      clipboard.destroy();
      reject(e);
    });
    document.body.appendChild(fakeEl);
    fakeEl.click();
    document.body.removeChild(fakeEl);
  });
};
