import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCart } from '../../dux/reducer';


class Mens extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        axios.get('/api/items').then(res => this.setState({ items: res.data }))
        axios.get('/api/user')
        axios.get('/api/cart').then(res => res.data.map((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
    }
    handleAddToCart(item) {
        axios.post('/api/cart', item).then(res =>
          res.data.map((item,i) => {
            if (!this.props.cart[i]) {
              this.props.updateCart(item)
            }
          }
          )
        )}
    render() {
        return (
            <div className='Home'>
                <div className='mens-top-container'>
                    <div><p>Mens-All Products</p></div>
                    <div className='mens-top-container-center'>
                        <h3>GYMSHARK MENS</h3>
                        <h1>MEN'S WORKOUT CLOTHES</h1>
                        <p>Explore all Men's Gymshark clothing. Gym and fitness clothes designed to complement the hard work and dedication you put in your workouts.</p>
                    </div>
                    <div><p>Mens-All Products</p></div>
                </div>
                <div className='mens-all-item-component'>
                    {this.state.items.map((item, i) => {
                        return (
                            <div className='mens-item-component' key={i}>
                                <img className='mens-product-image' src={item.item_image} alt='image1' />
                                <p className='frontpage-item-name'>{item.item_name}</p>
                                <p>{item.item_color}</p>
                                <p>${item.item_price}.00 USD</p>
                                <button onClick={() => this.handleAddToCart(item)}>Add To Cart</button>
                            </div>
                        )
                    })}
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

export default connect(mapStateToProps, { updateCart })(Mens)