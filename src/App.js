import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import MoneyTracker from './containers/MoneyTracker/MoneyTracker';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {/* <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> */}
            <Route path="/" exact component={MoneyTracker} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
