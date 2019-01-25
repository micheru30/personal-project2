import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteItemFromCart, updateQuantity } from '../../dux/reducer';
import axios from 'axios';



class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            customerInfo: {},
            confirmation: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            axios.get('/api/user').then(res => {
                this.setState({ customerInfo: res.data })
            })
            axios.get('/api/confirmation').then(res=>this.setState({confirmation: res.data})).then(axios.delete('/api/deletecart'))
            axios.get('/api/cart').then(res => {
                res.data.forEach((item, i) => {
                if (!this.props.cart[i]) {
                    this.props.updateCart(item)
                }
            })})
        }, 1000);
        this.props.deleteItemFromCart([])
    }
    handleContinueShopping(){
        window.location.href = '/#/'
    }
    render() {
        console.log(this.state.confirmation)
        let finalTotal = this.state.confirmation.reduce((acc, item) => {
            return acc + item.quantity * item.item_price
        }, 0)
        let confirmationSentence = `${this.state.customerInfo.customer_name} your order has been processed and is being shipped to ${this.state.customerInfo.customer_addresss_line_1} ${this.state.customerInfo.customer_addresss_line_2}, ${this.state.customerInfo.customer_city}, ${this.state.customerInfo.customer_state}, ${this.state.customerInfo.customer_zipcode}`
        return (
            <div className='Cart'>
                <div className='quantity-and-subtotal'>
                    <h4>CONFIRMATION #: {this.state.customerInfo.lastOrder}</h4>
                    <div className='quantity-and-subtotal-container2'>
                        <h4>QUANTITY</h4>
                        <h4>SUBTOTAL</h4>
                    </div>
                </div>
                <div className='item-displayed-in-cart'>
                    {this.state.confirmation.map((item, i) => {
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
                    <button className='confirmation-continue-shopping' onClick={this.handleContinueShopping}>Continue Shopping</button>
                    <div className='final-total-container'>
                        <h1 className='total'>TOTAL:</h1>
                        <div>${finalTotal}.00 USD</div>
                    </div>
                </div>
                <div className='confirmation'>
                <h3>
                {confirmationSentence}
                </h3>
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