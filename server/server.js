require("dotenv").config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');
const cors = require('cors');
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
    AUTH_PROTOCAL
} = process.env;

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(bodyParser.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 99999 }
}))


// app.use( async (req, res, next) => {
//     if (process.env.NODE_ENV) {
//         const db = req.app.get('db');
//         let user = await db.session_user();
//         req.session.user = user[0];
//         res.status(200).send(req.session.user);
//     } else {
//         next()
//     }
// })

// app.use(cors());

app.get('/auth/callback', async (req, res) => {

    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
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
    const db = app.get('db');
    db.update_customer([customerID, addressLine1, addressLine2, city, state, zipCode, phone])
        .then(user => res.send(user))
        .catch(err => {
            res.status(500).send({ errorMessage: 'Something went wrong' })
            console.log(err)
        })
})

app.delete('/api/cart', (req, res) => {
    if (req.session.cart) {
        req.session.cart = []
        res.status(200).send(req.session.cart)
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

app.get('/api/confirmation/', (req, res) => {
    const db = app.get('db');
    console.log(req.session.user.lastOrder)
    db.get_confirmation([req.session.user.lastOrder])
        .then(order => {
            console.log(order)
            res.status(200).send(order)})
        .catch(err => {
            res.status(500).send({ errorMessage: 'Something went wrong' })
            console.log(err)
        })
})

app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))