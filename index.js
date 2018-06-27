var cp = require('child_process')
var fs = require('fs')
var tmp = require('tmp')

module.exports = at

function at (date, cmd, cb) {
  cb = cb || noop

  if (isNaN(date = new Date(date))) {
    return cb(new Error('Invalid date'))
  }

  tmp.file(function (err, file) {
    if (err) return cb(err)

    fs.writeFile(file, cmd, function (err) {
      if (err) return cb(err)

      cp.spawn('at', ['-f', file, '-t', posix(date)])
        .once('close', function (code) {
          cb(check(code))
        })
    })
  })
}

function posix (date) {
  return date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) + '.' +
    pad(date.getSeconds())
}

function pad (num) {
  return (num < 10 ? '0' : '') + num
}

function check (nonzero) {
  return nonzero ?
    new Error('Exited with code: ' + nonzero) :
    null
}

function noop () {}
