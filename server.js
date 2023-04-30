const express=require('express')
const { connection } = require('./config/db')
const { adminRouter } = require('./routes/Admin.routes')
const {formRouter} =require('./routes/Form.routes')
const cors=require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
res.send('hello')
})

app.use('/admin',adminRouter)
app.use('/forms',formRouter)

const port=8080

app.listen(port,async()=>{
console.log(`server running on port ${port}`)
try {
    await connection
    console.log('connected to database')
} catch (error) {
    console.log('could not connect to database')
}
})