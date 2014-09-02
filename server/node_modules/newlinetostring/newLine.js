module.exports = function newLine(str, start) {
    return (start) ? ('\n' + str) : (str+'\n');
}
