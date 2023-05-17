const dotenv = require("dotenv");
// const dotenv=require('dotenv').config()
const path=require('path')
const express = require("express");
const colors=require('colors')
// const products = require("./data/products");
const {notFound, errorHandler}=require('./middleware/error')

const dB = require("./config/db");
const productRoute=require('./routes/product')
const usersRoute=require('./routes/user')
const orderRoute=require('./routes/order')
const uploadRoute=require('./routes/upload')

dotenv.config();
dB();
const app = express();

// it's allow json data from body(f.e)
app.use(express.json())


app.use('/api/products',productRoute)
app.use('/api/users',usersRoute)
app.use('/api/orders',orderRoute)
app.use('/api/upload',uploadRoute)

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))


// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/Fend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'Fend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
};

app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
