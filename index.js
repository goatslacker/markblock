var fs = require('fs')
var marked = require('marked')
var esprima = require('esprima')


var code = fs.readFileSync('./testcode.js').toString()

var comments = []

var parsed = esprima.parse(code, { loc: true, comment: true })

var comments = parsed.comments.map(function (comment) {
  return comment.value.replace(/\s*\*\n?/g, '\n')
}).join('\n\n')

//console.log(comments)

var md_tokens = marked.lexer(comments)
//console.log(md_tokens)
var md_ast = marked.parser(md_tokens)

//console.log(md_ast)
