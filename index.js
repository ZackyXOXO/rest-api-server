const axios = require('axios');
const express = require('express');
const app = express();
// const http = require('http');

app.get('/', (req, res ) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/products/',  (req, res ) => {
    res.send('<h1>Product!</h1>')
    axios({
        method: 'get',
        url: 'https://dummyjson.com/products/', 
    }).then(resp => {
        console.debug(resp.data)
    })
})

app.listen(3000, () => {
    console.log("server start with port 3000")
})