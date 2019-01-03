import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCart, updateQuantity } from '../../dux/reducer';


class Accessories extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        axios.get(`/api/accessories`).then(res => this.setState({ items: res.data }))
        axios.get('/api/cart').then(res => res.data.forEach((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
    }
    handleAddToCart(item) {
        axios.post('/api/cart', item).then(res => {
          this.props.updateQuantity(res.data)
        }
        )
      }
    render() {
        let mensProducts = this.state.items.map((item, i) => {
            return (
                <div className='mens-item-component' key={i}>
                    <img className='mens-product-image' src={item.item_image} alt='image1' />
                    <p className='frontpage-item-name'>{item.item_name}</p>
                    <p>{item.item_color}</p>
                    <p>${item.item_price}.00 USD</p>
                    <button onClick={() => this.handleAddToCart(item)}>Add To Cart</button>
                </div>
            )
        })
        return (
            <div className='Home'>
                <div className='mens-all-item-component'>
                    {mensProducts}
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

export default connect(mapStateToProps, { updateCart, updateQuantity })(Accessories)