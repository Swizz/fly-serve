const test = require('ava')
const http = require('ava-http')

const Fly = require('fly')

test.cb('import', function (t) {
  t.plan(2)

  const fly = new Fly({
    plugins: [require('../')],
    tasks: {
      * serve(fly) {
        yield fly.source('test/assets').serve({silent: true})
      }
    }
  })

  fly.start('serve')

  setTimeout(function () {
    http.get('http://localhost:3000')
      .then(res => {
        t.pass(res)
        t.is(res, '<h1>It works !</h1>')
        t.end()
      })
      .catch(err => {
        t.fail(err)
        t.end()
      })
  }, 1000)
})
