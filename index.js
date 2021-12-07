var express = require('express');
var jsonServer = require('json-server');
const auth = require('json-server-auth')

const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express()
const router = jsonServer.router('db.json')
// const cors = require('cors')

const rules = auth.rewriter({
    // Permission rules
    users: 600, //User must own the resource to write or read the resource.
    //tentit: 664, //User must be logged to write the resource. Everyone can read the resource.
    // Other rules
    //'/tentit/:id/kysymykset/vastattu': '/tentit/:id/kysymykset/vastattu',
  })

  
app.db = router.db

app.use(express.static('build'))
app.use(express.json())
// app.use(cors())
app.use(rules)
app.use(auth)
app.use(router)

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
},app)
sslServer.listen(3001, ()=>console.log('Secure server on port 3001'));