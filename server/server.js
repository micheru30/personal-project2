require("dotenv").config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../build`));

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    AUTH_PROTOCOL
} = process.env;

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(bodyParser.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 99999 }
}))

app.get('/auth/callback', async (req, res) => {

    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${AUTH_PROTOCOL}://${req.headers.host}/auth/callback`
    }

    // auth0 sending code in req.query.code
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    // exchange code for token. token is on resWithToken.data.access_token
    // exchange token for user data
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

    let { email, picture, sub, name } = userRes.data;
    // check if that user already exists in our db
    const db = app.get('db');
    let foundCustomer = await db.find_customer([sub]);
    if (foundCustomer[0]) {
        // found user existing in the db, put user on session
        req.session.user = foundCustomer[0];
    } else {
        // no user found by google id. create user in db
        let createdCust = await db.create_customer([name, sub, picture, email])
        req.session.user = createdCust[0]
    }
    res.redirect('/#/')
})

app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user)
    }
    else res.sendStatus(401)
})

app.get('/api/items', (req, res) => {
    const db = app.get('db');
    db.get_items()
        .then(items => res.send(items))
        .catch(err => {
            res.status(500).send({ errorMessage: 'Something went wrong' })
            console.log(err)
        })
})

app.post('/api/cart', (req, res) => {
    if (req.session.cart) {
        const index = req.session.cart.findIndex(item => item.item_id === req.body.item_id)
        if (index >= 0) { req.session.cart[index].quantity++ } else {
            req.body.quantity = 1
            req.session.cart.push(req.body)
        }
        res.status(200).send(req.session.cart)
    }
    else {
        req.body.quantity = 1;
        req.session.cart = [req.body]
        res.status(200).send(req.session.cart)
    }
})

app.get('/api/cart', (req, res) => {        
    if (req.session.cart) {
        res.status(200).send(req.session.cart)
    }
})

app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params
    req.session.cart.splice(id, 1)
    res.status(200).send(req.session.cart)
})

app.put('/api/cart', (req, res) => {
    const { id, quantity } = req.body
    if (!quantity) {
        req.session.cart = req.session.cart.filter(item => {
            return item.item_id !== id
        })
        return res.status(200).send(req.session.cart)
    }
    let foundItem = req.session.cart.find(item => {
        return item.item_id === id
    })
    foundItem.quantity = quantity
    return res.status(200).send(req.session.cart)
})

app.put('/api/user', (req, res) => {
    const { customerID, addressLine1, addressLine2, city, state, zipCode, phone } = req.body;
    req.session.user.customer_addresss_line_1 = addressLine1
    req.session.user.customer_addresss_line_2 = addressLine2
    req.session.user.customer_city = city
    req.session.user.customer_state = state
    req.session.user.customer_zipcode = zipCode
    req.session.user.customer_phone = phone
    const db = app.get('db');
    db.update_customer([customerID, addressLine1, addressLine2, city, state, zipCode, phone])
        .then(customer=> res.status(200).send(customer))
        .catch(err => {
            res.status(500).send({ errorMessage: 'Something went wrong' })
            console.log(err)
        })
})

app.delete('/api/deletecart', (req, res) => {
    if (req.session.cart) {
        req.session.cart = []
        res.sendStatus(200)
    }
})

app.post('/api/order', (req, res) => {
    const { order_id, customerID, item_id, quantity, order_date } = req.body;
    req.session.user.lastOrder = order_id
    const db = app.get('db');
    db.create_order([order_id, customerID, item_id, quantity, order_date])
        .then(order => res.status(200).send(order))
        .catch(err => {
            res.status(500).send({ errorMessage: 'Something went wrong' })
            console.log(err)
        })
})
app.get('/api/items/:gender',(req,res)=> {
    const {gender} = req.params
    const db = app.get('db');
    db.get_items_gender([gender]).then(items =>{
        res.status(200).send(items)
    })
    .catch(err => {
        res.status(500).send({ errorMessage: 'Something went wrong' })
        console.log(err)
    })
})
app.get('/api/accessories',(req,res)=> {
    const db = app.get('db');
    db.get_accessories().then(items =>{
        res.status(200).send(items)
    })
    .catch(err => {
        res.status(500).send({ errorMessage: 'Something went wrong' })
        console.log(err)
    })
})
app.get('/api/getorder',(req,res)=> {
    const db = app.get('db');
    db.get_order([req.session.user.lastOrder]).then(items =>{
        res.status(200).send(items)
    })
    .catch(err => {
        res.status(500).send({ errorMessage: 'Something went wrong' })
        console.log(err)
    })
})
app.get('/api/confirmation',(req,res)=> {
    const db = app.get('db');
    db.get_confirmation([req.session.user.lastOrder]).then(items =>{
        res.status(200).send(items)
    })
    .catch(err => {
        res.status(500).send({ errorMessage: 'Something went wrong' })
        console.log(err)
    })
})
app.post('/api/auth/signout',(req,res)=>{
    req.session.destroy()
    res.sendStatus(200)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))