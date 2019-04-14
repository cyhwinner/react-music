import React, { Component } from 'react';
import Header from 'components/header/Header';
import Recommend from 'components/recommend/Recommend';
import Tab from 'components/tab/Tab';
import {Switch, Route, Redirect} from 'react-router'
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tab />
        <Switch>
            <Route path='/' exact render={() => <Redirect to='recommend' />} />
            <Route path='/recommend' component={Recommend}/>
        </Switch>
      </div>
    );
  }
}

export default App;
