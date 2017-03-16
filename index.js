const serve = require('serve')
const fmt = require('fly/lib/fmt')

const defOpts = {
  port: 3000,
  ignore: ['node_modules'],
  unziped: true,
  silent: true,
  verbosity: true
}

module.exports = {
  name: 'serve',
  every: false,
  files: false,
  * func(globs, opts) {
    opts = Object.assign({}, defOpts, opts)

    const dir = yield this.$.expand(globs, {mark: true})

    if (dir.length > 1 && opts.verbosity) {
      this.$.alert(`Only the first found dir will be served`)
    }

    serve(dir[0], opts)

    if (opts.verbosity) {
      this.$.log(`${fmt.path(dir[0])} is served on ${fmt.path('localhost:')}${fmt.path(opts.port)}`)
    }
  }
}
