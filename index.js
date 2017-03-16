const clor = require('clor')
const serve = require('serve')
const format = clor.underline.cyan

const defOpts = {
  port: 3000,
  ignore: ['node_modules'],
  unziped: true,
  silent: true,
  verbosity: true
}

module.exports = function (fly, utils) {
  fly.plugin('serve', {every: false, files: false}, function * (globs, opts) {
    opts = Object.assign({}, defOpts, opts)

    const dir = yield utils.expand(globs, {mark: true})

    if (dir.length > 1 && opts.verbosity) {
      utils.alert(`Only the first found dir will be served`)
    }

    serve(dir[0], opts)

    if (opts.verbosity) {
      utils.log(`${format(dir[0])} is served on ${format(`localhost:${opts.port}`)}`)
    }
  })
}
