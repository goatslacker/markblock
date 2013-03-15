var esprima = require('esprima')

module.exports = function (code) {
  return esprima.parse(code, { comment: true })
    .comments.map(function (comment) {
      return comment.value
    }).join('\n\n')
}
