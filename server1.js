// make sure package.json call this file instead of default

const { createServer } = require('http')
const { parse } = require('url')
//our next.js
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
//creating or initializing an instance of next
const app = next({ dev })
//handle is a special method that comes back from next J.S.
const handle = app.getRequestHandler()

app.prepare().then(() => {
  //set up a simple server for each request and response
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    //VERY important, make next handle our routes,request etc.
    if (pathname === '/hey') {
      app.render(req, res, '/index', query)
    } else {
      handle(req, res, parsedUrl)
    }

    // if (pathname === '/a') {
    //   app.render(req, res, '/a', query)
    // } else if (pathname === '/b') {
    //   app.render(req, res, '/b', query)
    // } else {
    //   handle(req, res, parsedUrl)
    // }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})