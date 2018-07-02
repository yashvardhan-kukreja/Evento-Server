/**
 * Created by Yash 1300 on 23-06-2018.
 */

// Finds the ASCII of a character
module.exports.findAscii = (str) => str.charCodeAt(0);

// Converts the string str into a number = the sum of ASCII values of each character
module.exports.convertAStringToNumber = (str) => {
    let sum = 0;
    for (let i = 0; i<str.length;i++) sum += this.findAscii(str[i]);
    return sum;
};

// Checks whether any of the arguments passed in the function is an empty/null string
module.exports.dynamicEmptyFieldsCheck = () => {
    for (let i=0; i<arguments.length; i++) {
        if (arguments[i].trim() === "" || arguments[i] == null)
            return false;
    }
    return true;
};