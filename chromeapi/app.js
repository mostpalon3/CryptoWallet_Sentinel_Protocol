const express = require('express');
const cors = require('cors');

const userRouter = require('./Api/Routers/userRouter');
const tokenRouter = require('./Api/Routers/tokenRouter');
const accountRouter = require('./Api/Routers/accountRouter');

//Middleware
const app = express();
app.use(express.json({limit: '100kb'}));

app.use(cors());
app.options('*', cors());


//Routes
app.use('/user', userRouter);
app.use('/token', tokenRouter);
app.use('/account', accountRouter);

module.exports = app;