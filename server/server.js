const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE,{
  useCreateIndex:true,
  useFindAndModify:false,
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then()
.catch()

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));

readdirSync('./route')
.map(r=> 
  app.use('/api',require('./route/' + r))
)

// app.get('/plant',(req,res) => {
//   res.json({
//     data:'hit api'
//   })
// })

const port= process.env.PORT || 8000
app.listen(port,()=>console.log(`Server is running on port ${port}`))