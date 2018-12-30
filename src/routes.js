import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './component/Home/Home';
import Mens from './component/Mens/Mens';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import Confirmation from './component/Confirmation/Confirmation';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/mens' component={Mens}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/confirmation' component={Confirmation}/>
    </Switch>
)