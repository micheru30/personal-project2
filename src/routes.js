import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './component/Home/Home';
import Mens from './component/Mens/Mens'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/mens' component={Mens}/>
    </Switch>
)