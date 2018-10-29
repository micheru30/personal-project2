import React, { Component } from 'react';
import {connect} from 'react-redux';

class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <div className='top-nav'>
                    <img className='logo' src='https://cdn.shopify.com/s/files/1/0156/6146/t/106/assets/logo.svg?14217673215767397487' alt='Logo' />
                    <div className='nav-categories'>
                        <ul className='clothing-nav'>
                            <li>Mens</li>
                            <li>Womens</li>
                            <li>Accessories</li>
                        </ul>
                    </div>
                    <div className='nav-icons'>
                        <input className='search-input' placeholder='SEARCH'></input>
                        <img className='search-icon' src='https://static.thenounproject.com/png/14173-200.png' alt='Search Icon' />
                        <img className='account-icon' src='https://www.shareicon.net/download/2015/09/17/102318_man_512x512.png' alt='Account' />
                        <img className='cart-icon' src='https://static.thenounproject.com/png/28589-200.png' alt='Shopping Bag' />
                        <div className='cart-counter'>{this.props.cart.length}</div>
                    </div>
                </div>
                <div className='header'>
                    <div className='notifications'>Notifications</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Nav)