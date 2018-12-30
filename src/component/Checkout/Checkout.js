import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteItemFromCart, updateQuantity } from '../../dux/reducer';
import axios from 'axios';



class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            customerID: '',
            customerName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            phone: ''
        }
        this.handleCustomerInfoUpdate = this.handleCustomerInfoUpdate.bind(this)
    }
    componentDidMount() {
        axios.get('/api/user').then(res => this.setState({
            customerName: res.data.customer_name,
            customerID: res.data.customer_id
        }))
        axios.get('/api/cart').then(res => res.data.map((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
    }
    handleDeleteFromCart(i) {
        axios.delete(`/api/cart/${i}`).then(res => this.props.deleteItemFromCart(res.data))
    }
    handleQuantityUpdate(id, quantity) {
        axios.put('/api/cart', { id, quantity }).then(res => this.props.updateQuantity(res.data))
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCustomerInfoUpdate() {
        const { customerID, addressLine1, addressLine2, city, state, zipCode, phone } = this.state;
        let order_id = Date.now() + Math.random().toString().slice(2);
        let date = new Date();
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        let order_date = `${month}-${day}-${year}`
        axios.put('api/user', { customerID, addressLine1, addressLine2, city, state, zipCode, phone }).then((user) => {
            console.log(user.data)
        })
        this.props.cart.map(item=>{
            const {item_id,quantity} = item
            axios.post('/api/order',{order_id, customerID, item_id, quantity, order_date}).then(res=>{
                console.log(res.data)
                window.location.href = '/#/confirmation'
            })
        })
    }
    render() {
        let finalTotal = this.props.cart.reduce((acc, item) => {
            return acc + item.quantity * item.item_price
        }, 0)
        console.log(this.props.cart)
        return (
            <div className='checkout-page'>
                <div>
                    <h1>Customer Name</h1>
                    <div className='customer-name-container'>
                        <h3>
                            {this.state.customerName}
                        </h3>
                    </div>
                    <h1>Shipping Address</h1>
                    <div className='customer-info'>
                        <input name={'addressLine1'} onChange={(e) => this.handleChange(e)} placeholder='Address line 1' className='address-line1' />
                        <input name={'addressLine2'} onChange={(e) => this.handleChange(e)} placeholder='Address line 2' className='address-line2' />
                        <input name={'city'} onChange={(e) => this.handleChange(e)} placeholder='City' className='customer-city' />
                        <input name={'state'} onChange={(e) => this.handleChange(e)} placeholder='State' className='customer-state' />
                        <input name={'zipCode'} onChange={(e) => this.handleChange(e)} placeholder='ZIP code' className='zip-code' />
                        <input name={'phone'} onChange={(e) => this.handleChange(e)} placeholder='Phone Number' className='phone-number' />
                        <button onClick={this.handleCustomerInfoUpdate}>ProceedToConfirmation</button>
                    </div>
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