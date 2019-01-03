import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCart, updateQuantity } from '../../dux/reducer';


class Products extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
        }
    }
    componentDidMount() {
        axios.get(`/api/items/${this.props.match.params.gender}`).then(res => this.setState({ items: res.data }))
        axios.get('/api/cart').then(res => res.data.forEach((item, i) => {
            if (!this.props.cart[i]) {
                this.props.updateCart(item)
            }
        }))
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            axios.get(`/api/items/${this.props.match.params.gender}`).then(res => this.setState({ items: res.data }))
        }
    }
    handleAddToCart(item) {
        axios.post('/api/cart', item).then(res => {
          this.props.updateQuantity(res.data)
        }
        )
      }
    render() {
        let genderDisplay = <div></div>
        if (this.props.match.params.gender === 'male'){
            genderDisplay = <div className='mens-top-container'>
            <div><p>Mens-All Products</p></div>
            <div className='mens-top-container-center'>
                <h3>GYMSHARK MENS</h3>
                <h1>MEN'S WORKOUT CLOTHES</h1>
                <p>Explore all Men's Gymshark clothing. Gym and fitness clothes designed to complement the hard work and dedication you put in your workouts.</p>
            </div>
            <div><p>Mens-All Products</p></div>
        </div>
        } else if (this.props.match.params.gender === 'female'){
            genderDisplay = <div className='mens-top-container'>
            <div><p>Womens-All Products</p></div>
            <div className='mens-top-container-center'>
                <h3>GYMSHARK WOMENS</h3>
                <h1>WOMEN'S WORKOUT CLOTHES</h1>
                <p>Explore all Women's Gymshark clothing. Gym and fitness clothes designed to complement the hard work and dedication you put in your workouts.</p>
            </div>
            <div><p>Womens-All Products</p></div>
        </div>
        }
        let mensProducts = []
        if(this.props.match.params.type === 'all'){
            mensProducts = this.state.items.map((item, i) => {
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
        } else mensProducts = this.state.items.filter(item => item.item_type === this.props.match.params.type)
        .map((item, i) => {
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
                {genderDisplay}
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

export default connect(mapStateToProps, { updateCart, updateQuantity })(Products)