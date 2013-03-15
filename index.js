var fs = require('fs')
var marked = require('marked')

var isJS = function (f) { return /\.js$/.test(f) }
var isCS = function (f) { return /\.coffee$/.test(f) }
var isCSS = function (f) { return /\.css$/.test(f) }

var parser = {}
parser['coffee'] = require('./coffee-parser')
parser['css'] = require('./css-parser')
parser['js'] = require('./js-parser')
parser['noop'] = function () { return null }

function getParser(file) {
  if (isJS(file)) {
    return 'js'
  } else if (isCSS(file)) {
    return 'css'
  } else if (isCS(file)) {
    return 'coffee'
  }

  return 'noop'
}

function ast(file) {
  var code = fs.readFileSync(file).toString()
  var comments = parser[getParser(file)].call(null, code)

  return comments && marked.lexer(comments)
}

ast.toHTML = function(file) {
  var tokens = ast(file)
  return marked.parser(tokens)
}

module.exports = ast
