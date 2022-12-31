import express from 'express'
import cors from 'cors'
import { resHeaders } from './headers.js';
import { corsOptions } from './options.js'

const app = express()
app.use(cors())

const PORT = 8080

// Endpoint for tests
app.get('/', cors(corsOptions), (req, res) => {
  // Set response headers
  res.set(resHeaders)
  res.send(JSON.stringify(        {
    "code": "Success",
    "message": "Request success",
    "details": null,
    "info": "Hello there",
    "status": 200
  }))
})

app.listen(PORT)
console.log(`server running in por ${PORT}`);

