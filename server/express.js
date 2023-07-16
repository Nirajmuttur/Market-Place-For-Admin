import devBundle from './devBundle'
import template from './../template'

import path from 'path'

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const shopRoutes = require('./routes/shopRoutes')
const productRoutes = require('./routes/productRoutes')
const employeeRoutes=require('./routes/employeeRoutes')
const adminRoutes=require('./routes/adminRoutes')
const bannerRoutes=require('./routes/bannerRoutes')
const express = require('express')
const cors =require('cors')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const CURRENT_WORKING_DIR = process.cwd()

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(cors({credentials: true,origin: 'http://localhost:3001'}))

app.use('/dist',express.static(path.join(CURRENT_WORKING_DIR,'dist')))

app.use('/',userRoutes)
app.use('/',authRoutes)
app.use('/',shopRoutes)
app.use('/',productRoutes)
app.use('/',employeeRoutes)
app.use('/',adminRoutes)
app.use('/',bannerRoutes)

app.get('/',(req,res)=>{
    res.status(200).send(template())
})



devBundle.compile(app)

export default app