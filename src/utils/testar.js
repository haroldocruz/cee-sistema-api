

const util = require('./util');

var var1 = "José Washington Perêira da Cruz";

util.removeAccents(var1)

util.percentual(200, 30)

util.filters('', var1.split(' '), {caseSensitive: true}) //?




console.log(util.percentual(200, 30))
console.log(util.removeAccents(var1))