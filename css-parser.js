function getComments(code) {
  code.trim()

  var i = 0
  var chunk = ''
  var record = false

  var comments = ''

  while (i < code.length) {
    chunk = code.substr(i, code.length)

    if (record) {
      // end of comments
      if (/^(\*\/)/.test(chunk)) {
        record = false
        i += 2
        continue
      }

      comments += chunk[0]

      i += 1
      continue
    }

    if (/^(\/\*)/.test(chunk)) {
      record = true
      i += 2
    }

    i += 1
  }

  return comments
}

module.exports = getComments
