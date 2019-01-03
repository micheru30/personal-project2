import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteItemFromCart, updateQuantity } from '../../dux/reducer';
import axios from 'axios';



class Cart extends Component {
    constructor(){
        super()
        this.state = {
            userInfo: {}
        }
        this.handleCheckout = this.handleCheckout.bind(this)
    }
    componentDidMount() {
        axios.get('/api/user').then(res => this.setState({userInfo: res.data}))
        axios.get('/api/cart').then(res => res.data.forEach((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
    }
    handleDeleteFromCart(i) {
        axios.delete(`/api/cart/${i}`).then(res => {
            this.props.deleteItemFromCart(res.data)})
    }
    handleQuantityUpdate(id, quantity) {
        axios.put('/api/cart', { id, quantity }).then(res => this.props.updateQuantity(res.data))
    }
    handleContinueShopping(){
        window.location.href = '/#/'
    }
    handleCheckout(){
        if(!this.state.userInfo['customer_name']){
            alert('Please Login')
        } else window.location.href = '/#/checkout'
    }
    render() {
        let shoppingCart = []
        let finalTotal = this.props.cart.reduce((acc, item) => {
            return acc + item.quantity * item.item_price
        }, 0)
        if(this.props.cart.length === 0){
            return <h3 className='cart-is-empty'>Your cart is empty.</h3>
        } else {
            shoppingCart = this.props.cart.map((item, i) => {
                return (
                    <div key={i} className='cart-item-container'>
                        <div className='cart-item-component' key={i}>
                            <div className='cart-image-and-name'>
                                <img className='cart-product-image' src={item.item_image} alt='image1' />
                                <div className='cart-item-info'>
                                    <p className='cart-item-name'>{item.item_name}</p>
                                    <p>{item.item_color}</p>
                                    <p>${item.item_price}.00 USD</p>
                                </div>
                            </div>
                            <div className='quantity-and-subtotal-container'>
                                <div className='quantity-update'>
                                    <p>QUANTITY</p>
                                    <div className='increase-decrease-quantity'>
                                        <button onClick={() => this.handleQuantityUpdate(item.item_id, item.quantity - 1)} className='decrease-button'>-</button>
                                        <div className='quantity'>
                                            {item.quantity}
                                        </div>
                                        <button onClick={() => this.handleQuantityUpdate(item.item_id, item.quantity + 1)} className='increase-button'>+</button>
                                    </div>
                                    <button className='remove-from-cart' onClick={() => this.handleDeleteFromCart(i)}>Remove from cart</button>
                                </div>
                                <div className='subtotal-container'>
                                    ${item.quantity * item.item_price}.00 USD
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className='cart'>
                <div className='quantity-and-subtotal'>
                    <div className='shopping-cart-header'><h4>SHOPPING CART</h4></div>
                    <div className='quantity-and-subtotal-container2'>
                        <h4>QUANTITY</h4>
                        <h4>SUBTOTAL</h4>
                    </div>
                </div>
                <div className='item-displayed-in-cart'>
                    {shoppingCart}
                </div>
                <div className='final-total'>
                    <button className='continue-shopping-cart' onClick={this.handleContinueShopping}>Continue Shopping</button>
                    <div className='final-total-container'>
                        <h1 className='total'>TOTAL:</h1>
                        <div>${finalTotal}.00 USD</div>
                    </div>
                </div>
                <div className='checkout'>
                        <button onClick={this.handleCheckout}>CHECKOUT</button>
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

export default connect(mapStateToProps, { updateCart, deleteItemFromCart, updateQuantity })(Cart)