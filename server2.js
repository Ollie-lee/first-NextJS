// make sure package.json call this file instead of default
const express = require('express')
//our next.js
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
//creating or initializing an instance of next
const app = next({ dev })
//handle is a special method that comes back from next J.S.
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();
  //So for every single request that comes in, 
  //what we're going to do is return handle of that request

  server.get('/p/:id', (req, res) => {
    //app.render(req, res, '/index', query)
    //in the post, we have query string'?id=xxx'


    app.render(req, res, '/post', { id: req.params.id, color:'pink'})
  })

  server.get('*', (req, res) => {
    //reset what next.js do (still can't go to localhost:3000/p/1)
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('>>now serving on local host 3000');
  })
})