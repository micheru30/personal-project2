require("dotenv").config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const cors = require('cors');

const app = express();

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
} = process.env;

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cors());

app.get('/api/items',(req,res)=>{
    const db = app.get('db');
    db.get_items()
    .then(items=>res.send(items))
    .catch(err => {
        res.status(500).send({ errorMessage: 'Something went wrong' })
        console.log(err)
    })
})



app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))