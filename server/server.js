const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE,{
  useCreateIndex:true,
  useFindAndModify:true,
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=> console.log('DB connect success'))
.catch(err => console.log('DB connect error',err))

app.use(bodyParser.json({limit: '50mb', extended: true}))

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