/**
 * Created by Yash 1300 on 23-06-2018.
 */

module.exports.findAscii = (str) => str.charCodeAt(0);

module.exports.convertAStringToNumber = (str) => {
    let sum = 0;
    for (let i = 0; i<str.length;i++) sum += this.findAscii(str[i]);
    return sum;
};
