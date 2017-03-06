import express from 'express'
import path from 'path'


var app = express()

app.get('/', (req, res) => {
  res.sendFile('index.html',{
    root: __dirname
  });
})

app.get('/build.js', (req, res) => {
  res.sendFile('build.js', {
    root: __dirname + '/build/'
  })
})

app.get('/music/:name', (req, res) => {
  res.sendFile(req.params.name, {
    root: __dirname + '/public/music/'
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
