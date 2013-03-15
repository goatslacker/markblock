var coffee = require('coffee-script')

module.exports = function (code) {
  return coffee.tokens(code).filter(function (token) {
    return token[0] === 'HERECOMMENT'
  }).map(function (token) {
    return token[1]
  }).join('\n\n')
}
