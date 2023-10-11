const express = require('express');
const cors = require('cors')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')

const Product = require('./models/ProductModel')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: { sslCA: cert}};
const connstring = 'mongodb+srv://st10084532:WZf0pYgPokk3aYsy@cluster0.7i434ky.mongodb.net/?retryWrites=true&w=majority'

const ProductRoutes = require("./routes/Product");
const userRoutes = require('./routes/user')

mongoose.connect(connstring)
.then(()=>
{
    console.log("Connected :-)")
})
.catch(()=>
{
    console.log('NOT connected :-(')
},options);

app.use(express.json())

app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
})

app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(cors());
app.use(urlprefix+'/products',ProductRoutes)
app.use(urlprefix+'/users',userRoutes)


module.exports = app;
