import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteItemFromCart, updateQuantity } from '../../dux/reducer';
import axios from 'axios';



class Checkout extends Component {
    constructor() {
        super();
        this.state = {
           customerInfo: '',
           confirmation: []
        }
    }
    componentDidMount() {
        axios.get('/api/user').then(res => this.setState({
            customerInfo: res.data
        }))
        axios.get('/api/cart').then(res => res.data.map((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
        axios.get(`/api/confirmation/`).then(res => this.setState({
            confirmation: res.data
        }))
    }
    render() {
        let finalTotal = this.props.cart.reduce((acc, item) => {
            return acc + item.quantity * item.item_price
        }, 0)
        console.log(this.state.confirmation)
        return (
            <div className='Cart'>
                <div className='quantity-and-subtotal'>
                    <div><h4>ITEM</h4></div>
                    <div className='quantity-and-subtotal-container2'>
                        <h4>QUANTITY</h4>
                        <h4>SUBTOTAL</h4>
                    </div>
                </div>
                <div className='item-displayed-in-cart'>
                    {this.props.cart.map((item, i) => {
                        return (
                            <div className='cart-item-container' key={i}>
                                <div className='cart-item-component'>
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
                                                <div className='quantity'>
                                                    {item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='subtotal-container'>
                                            ${item.quantity * item.item_price}.00 USD
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='final-total'>
                    <a href='/#/'>Continue Shopping</a>
                    <div className='final-total-container'>
                        <h1 className='total'>TOTAL:</h1>
                        <div>${finalTotal}.00 USD</div>
                    </div>
                </div>
                <div className='confirmation'>
                <h4>Shipment has been place and is being sent to 231 W Hidden Hollow Dr, Orem, UT, 84058</h4>
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

export default connect(mapStateToProps, { updateCart, deleteItemFromCart, updateQuantity })(Checkout)