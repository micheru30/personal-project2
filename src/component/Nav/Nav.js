import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        axios.get('/api/items').then(res => this.setState({ items: res.data }))
        axios.get('/api/user').then(console.log)
    }
    handleAddToCart(item) {
        this.props.updateCart(item)
    }
    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    render() {
        return (
            <div className='nav'>
                <div className='top-nav'>
                    <a href='/#/'>
                        <img className='logo' src='https://cdn.shopify.com/s/files/1/0156/6146/t/106/assets/logo.svg?14217673215767397487' alt='Logo' />
                    </a>
                    <div className='nav-categories'>
                        <div className='dropdown'>
                            <ul className='clothing-nav'>
                                <div className='mens-clothing-list'>
                                    <a>Mens</a>
                                    <a href='/#/mens'>All Products</a>
                                    <a href='/#/'>Tops</a>
                                    <a href='/#/'>Bottoms</a>
                                </div>
                                <div className='womens-clothing-list'>
                                    <a>Womens</a>
                                    <a href='/#/'>All Products</a>
                                    <a href='/#/'>Tops</a>
                                    <a href='/#/'>Bottoms</a>
                                </div>
                                <div className='accessories'>
                                    <a>
                                        Accessories
                                    </a>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className='nav-icons'>
                        <input className='search-input' placeholder='SEARCH'></input>
                        <img className='search-icon' src='https://static.thenounproject.com/png/14173-200.png' alt='Search Icon' />
                        <img onClick={this.login} className='account-icon' src='https://www.shareicon.net/download/2015/09/17/102318_man_512x512.png' alt='Account' />
                        <div className='nav-cart-contents'>
                            <img className='cart-icon' src='https://static.thenounproject.com/png/28589-200.png' alt='Shopping Bag' />
                        </div>
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

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Nav)