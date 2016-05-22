var express = require('express')
var harp = require('harp')
var app = express()

app.use(harp.mount(__dirname + '/www'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

console.log('Server is running...')
app.listen(process.env.PORT || 3000)
