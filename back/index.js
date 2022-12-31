import express from 'express'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import { resHeaders } from './headers.js';
import { corsOptions, swaggerOptions } from './options.js'
import filesRouter from './routes/files.js'

const app = express()
app.use(cors())
app.use("/files", filesRouter)

const PORT = 8080
const specs = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs) )

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

