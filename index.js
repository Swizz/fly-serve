const serve = require('serve')
const fmt = require('fly/lib/fmt')

module.exports = {
  name: 'serve',
  every: false,
  files: false,
  * func(globs, opts) {
    const defOpts = Object.assign({
      port: 3000,
      ignore: ['node_modules'],
      unziped: true
    }, opts)

    const dir = yield this.$.expand(globs, {mark: true})

    if (dir.length > 1) {
      this.$.alert(`Only the first found dir will be served`)
    }

    serve(defOpts, dir[0])

    this.$.log(`${fmt.path(dir[0])} is served on ${fmt.path('localhost:')}${fmt.path(defOpts.port)}`)
  }
}
