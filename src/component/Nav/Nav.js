import React, { Component } from 'react';
import { connect } from 'react-redux';


class Nav extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }
    
    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }

    render() {
       let cartQuantity = this.props.cart.reduce((acc,item)=>{
           return acc+item.quantity           
       },0)
        return (
            <div className='nav'>
                <div className='top-nav'>
                    <a href='/#/'>
                        <img className='logo' src='https://cdn.shopify.com/s/files/1/0156/6146/t/115/assets/logo.svg?15444016502647805719' alt='Logo' />
                    </a>
                    <div className='nav-categories'>
                        <div className='dropdown'>
                            <ul className='clothing-nav'>
                                <div className='mens-clothing-list'>
                                    <div>Mens</div>
                                    <a href='/#/clothes/male/all'>All Products</a>
                                    <a href='/#/clothes/male/tops'>Tops</a>
                                    <a href='/#/clothes/male/bottoms'>Bottoms</a>
                                </div>
                                <div className='womens-clothing-list'>
                                    <div>Womens</div>
                                    <a href='/#/clothes/female/all'>All Products</a>
                                    <a href='/#/clothes/female/tops'>Tops</a>
                                    <a href='/#/clothes/female/bottoms'>Bottoms</a>
                                </div>
                                <div className='accessories'>
                                    <a href='/#/accessories' className="accessories-link">
                                        Accessories
                                    </a>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className='nav-icons'>
                        <img onClick={this.login} className='account-icon' src='https://www.shareicon.net/download/2015/09/17/102318_man_512x512.png' alt='Account' />
                        <div className='nav-cart-contents'>
                            <a href="/#/cart">
                                <img className='cart-icon' src='https://static.thenounproject.com/png/28589-200.png' alt='Shopping Bag' />
                            </a>
                        </div>
                        <div className='cart-counter'>{cartQuantity}</div>
                    </div>
                </div>
                <div className='header'>
                    <div className='notifications'>Free Shipping On Purchases over $75 USD</div>
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