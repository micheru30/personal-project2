import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCart, updateQuantity } from '../../dux/reducer';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    }
  }
  componentDidMount() {
    axios.get('/api/items').then(res => this.setState({ items: res.data }))
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
  handleWomensExplorer(){
    window.location.href = '/#/clothes/female/all'
  }
  handleMensExplorer(){
    window.location.href = '/#/clothes/male/all'
  }
  render() {
    let itemHomeArray = this.state.items.filter((item, i) => i === 2 || i === 3 || i === 4)
    .map((item, i) => {
      return(
      <div className='indidual-item-component-frontpage' key={i}>
        <img className='item-default-image' src={item.item_image} alt='image1' />
        <p className='frontpage-item-name'>{item.item_name}</p>
        <p>{item.item_color}</p>
        <p>${item.item_price}.00 USD</p>
        <button onClick={() => this.handleAddToCart(item)}>Add To Cart</button>
      </div>
      )
    }
    )
    return (
      <div className='Home'>
        <div className='landing-image'>
          <div className='text-over-image1'>
            <p className='better-together'>BETTER TOGETHER</p>
            <p className=''>An unbeatable combination.</p>
            <button className='explore-button' onClick={this.handleWomensExplorer}>Explore</button>
          </div>
        </div>
        <div className='frontpage-item-component'>
          <div className='new-releases'>New Releases</div>
          {itemHomeArray}
        </div>
        <div className='second-image'>
          <div className='text-over-image2'>
            <p className='bold-text-over-image2'>TRIED AND TESTED</p>
            <p className='image2-small-text'>Get trough it all.</p>
            <button className='second-explore-button' onClick={this.handleMensExplorer}>Explore</button>
          </div>
        </div>
        <div className='third-and-fourth-images'>
          <div className='third-image'>
            <div className="text-over-image3">
              <p className='shop-mens-line1'>SHOP</p>
              <p className='shop-means-line2'>MEN'S</p>
                <button className='explore-mens' onClick={this.handleMensExplorer}>EXPLORE</button>
            </div>
          </div>
          <div className='fourth-image'>
            <div className='text-over-image4'>
              <p>SHOP</p>
              <p>WOMEN'S</p>
              <button className='explore-womens' onClick={this.handleWomensExplorer}>EXPLORE</button>
            </div>
          </div>
        </div>
        <div className='fifth-image'>
          <div className='text-over-image5'>
              <p className='student'>MENS</p>
              <p className='discount'>CLOTHES</p>
              <button className='read-more-button' onClick={this.handleMensExplorer}>EXPLORE</button>
          </div>
        </div>
        <div className='shop-instagram'>
          <p className='shop-instagram-text'>Shop Instagram</p>
        </div>

        <div className='shop-instagram-photos'>
          <div className='container1'>
            <div className='photo1' />
          </div>
          <div className='container2'>
            <div className='photo2' />
            <div className='photo3' />
            <div className='photo4' />
            <div className='photo5' />
            <div className='photo6' />
            <div className='photo7' />
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

export default connect(mapStateToProps, { updateCart, updateQuantity })(Home)