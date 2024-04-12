/*
 * @Description:
 * @Date: 2020-11-18 16:24:20
 * @LastEditors: gzw
 * @LastEditTime: 2020-11-18 16:47:05
 */
// prettier.config.js or .prettierrc.js
module.exports = {
  printWidth: 100, // 设置prettier单行输出（不折行）的（最大）长度
  tabWidth: 2, // 设置工具每一个水平缩进的空格数
  semi: true, // 在语句末尾添加分号
  singleQuote: true, // 使用单引号而非双引号
  arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号，参数个数为1时可以省略圆括号
  rangeStart: 0, // 只格式化某个文件的一部分
  rangeEnd: Infinity, // 只格式化某个文件的一部分
};
