var express = require('express')
var path = require('path')
var app = express()

app.get('/', function (req, res) {
  res.sendFile('index.html',{
    root: __dirname
  });
})

app.get('/build.js', function (req, res) {
  res.sendFile('build.js', {
    root: __dirname + '/build/'
  })
})

app.get('/music/:name', function (req, res) {
  res.sendFile(req.params.name, {
    root: __dirname + '/public/music/'
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
