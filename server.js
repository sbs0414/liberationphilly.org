const express = require('express')
const harp = require('harp')
const app = express()

const PORT = process.env.PORT || 3000

app.use(harp.mount(__dirname + '/www'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

console.log(`Server is running at http://localhost:${PORT}`)
app.listen(PORT)
