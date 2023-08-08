const creatorError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());
app.use('/api', indexRouter);

//handel erro
app.use((err, req, res , next ) => {
    console.log(err)
    err.statusCode == err.statusCode || 500;
    err.message == err.message || "Internal Server error";
    res.status(err.statusCode).json({
        message : err.message
    })
})
app.listen(3000,() => console.log('Server is running on port https://localhost:3000'));
