import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch';
import * as csv from '@fast-csv/parse';
import { externalHeaders, resHeaders } from '../headers.js';
import { corsOptions } from '../options.js'

const router = express.Router()

const BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'

/**
 * @swagger
 * components:
 *   schemas:
 *     files:
 *       type: object
 *       properties:
 *         code: 
 *           type: string
 *           description: type status code
 *         message:
 *           type: string
 *           description: simple message
 *         details:
 *           type: string || null
 *           description: request details
 *         info:
 *           type: array[str]
 *           description: files names
 *         status:
 *           type: number
 *           description: status code
 *       example:
 *         code: Success,
 *         message: Request success,
 *         details: null,
 *         info: e.files,
 *         status: 200
 */

/**
  * @swagger
  * tags:
  *   name: files
  *   description: The files managing API
  */


/**
 * @swagger
 * /files/list:
 *   get:
 *     summary: Returns the list of all the files
 *     tags: [files]
 *     responses:
 *       200:
 *         description: The list of the files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


// Get List of file
router.get('/list', cors(corsOptions), (req, res) => {
  try {
    // Set response headers
    res.set(resHeaders)
    fetch(`${BASE_URL}/files`,{ headers: externalHeaders})
      .then(e => e.json())
      .then(e=> res.send(
        {
          "code": "Success",
          "message": "Request success",
          "details": null,
          "info": e.files,
          "status": 200
        }
      ))
  } catch (error) {
    console.log(error);
    res.send({
      "code": "SYS-ERR",
      "message": "System error",
      "details": null,
      "status": 501
    })
  }
})


/**
 * @swagger
 * /files/data:
 *   get:
 *     summary: Get the file by filename
 *     tags: [files]
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: The file name
 *     responses:
 *       200:
 *         description: The infor inside files.csv
 *         contens:
 *           application/json:
 *       404:
 *         description: The file was not found
 *       501:
 *         description: System error
 */


// Download file by query path
router.get('/data', cors(corsOptions), (req, res) => {

  if(!req.query.filename){
    // set status code 
    res.status(404)
    
    return res.send({
      "code": "SYS-ERR",
      "message": "Not Found",
      "details": null,
      "status": 404
    })
  }

  // set response headers
  res.set(resHeaders)
  try {
    // Fetch the csv document
    fetch(`${BASE_URL}/file/${req.query.filename}`,{ headers: externalHeaders})
      .then(e => e.text()) // transform response to test
      .then(e => {
        if(e.match(/404|500/)){
          return res.send(JSON.stringify({
            "code": "SYS-ERR",
            "message": "Not Found",
            "details": null,
            "info": [],
            "status": 404
          })) 
        }
        const data = [] // create an array for save the data parsed
        csv.parseString(e, { // create a stream 
          headers: true, // get the headers
          ignoreEmpty: true, // ignore empty rows
          strictColumnHandling: true, // validate data has the header size
        })
          .on('error', (error) => console.error(error))
          .on('data', (row) => data.push(row)) // push data parsed
          .on('end', (rowCount) => {
            console.log(`Parsed ${rowCount} rows`)
            return res.send(JSON.stringify({
              "code": "Success",
              "message": "Request success",
              "details": null,
              "info": data,
              "status": 200
            })) 
          })
      })
  } catch (error) {
    console.log(error);
    res.set(resHeaders)
    return res.send({
      "code": "SYS-ERR",
      "message": "System error",
      "details": null,
      "status": 501
    })
  }
})

export default router