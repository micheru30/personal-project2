import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './component/Home/Home';
import Products from './component/Products/Products';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import Confirmation from './component/Confirmation/Confirmation';
import Accessories from './component/Accessories/Accessories'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/clothes/:gender/:type' component={Products}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/confirmation' component={Confirmation}/>
        <Route path='/accessories' component={Accessories}/>
    </Switch>
)