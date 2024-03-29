require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.set('view engine','ejs');
app.use(logger);
const usedTokens = new Set();


const path = '/api/v1';
const { bearerTokenRequest,validateToken} = require('./authentication/auth');
app.post('/auth/token',jsonParser,bearerTokenRequest)

app.get('/', (req,res)=>{
    // res.sendStatus('400');
    // res.download('server.js');
    // res.status(300).json({message:'fdsfsdfs'});
    // res.render('index',{ text: "world"});
    res.render('index',{ text: "world"});
})

const userRouter = require('./routes/products');
app.use(path,validateToken, userRouter);

function logger(req, res, next){
    console.log(req.originalUrl);
    next();
}

app.use((req,res)=> {
    res.status(404).json({
        status:'404',
        message: 'Invalid Request'
    });
})

app.listen(process.env.APP_PORT, () => {
    console.log("Server started on port: ",process.env.APP_PORT);
});

