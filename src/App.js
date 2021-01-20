import React, { Component } from 'react';
import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import {Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* <BurgerBuilder/> */}
          {/* //we could also use <Switch> instead of exact and this order */}
          {/* //note: only these directly loaded Components get the special Route props (match, history etc.) */}
          {/* //BUT we can use withRouter (wrap export) to inject them */}
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Layout>
      </div>
    );
  }
}

export default App;
