var css_parser = require('./css-parser')
var fs = require('fs')
var js_parser = require('./js-parser')
var marked = require('marked')

var isJS = function (f) { return /\.js$/.test(f) }
var isCS = function (f) { return /\.coffee$/.test(f) }
var isCSS = function (f) { return /\.css$/.test(f) }

function ast(file) {
  var code = fs.readFileSync(file).toString()
  var comments = null

  if (isJS(file)) {
    comments = js_parser(code)
  } else if (isCSS(file)) {
    comments = css_parser(code)
  }

  return comments && marked.lexer(comments)
}

ast.toHTML = function(file) {
  var tokens = ast(file)
  return marked.parser(tokens)
}

module.exports = ast
