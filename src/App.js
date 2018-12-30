import React, { Component } from 'react';
import './App.css';
import Nav from './component/Nav/Nav';
import routes from './routes';
import Footer from './component/Footer/Footer';
import axios from 'axios'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
