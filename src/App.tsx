import React, { Component } from 'react';
import Header from 'components/header/Header';
import Recommend from 'components/recommend/Recommend';
import Tab from 'components/tab/Tab';
import {Switch, Route, Redirect} from 'react-router'
import logo from './logo.svg';
import Loadable from 'react-loadable';
import Loading from 'reuse/loading/Loading';
import Player from 'components/player/Player'


const Rank = Loadable({
  loader: () => { return import ('components/rank/Rank')},
  loading: () => <Loading text={'按需加载'} />
})
const Singer = Loadable({
  loader: () => { return import('components/singer/Singer')},
  loading: () => <Loading text={"按需加载"} />
})
const Search = Loadable({
  loader: () => { return import('components/search/Search')},
  loading: () => <Loading text={"按需加载"} />
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tab />
        <Switch>
            <Route path='/' exact render={() => <Redirect to='recommend' />} />
            <Route path='/recommend' component={Recommend}/>
            <Route path='/singer' component={Singer}/>
            <Route path='/rank' component={Rank}/>
            <Route path='/search' component={Search}/>
        </Switch>
        <Player />
      </div>
    );
  }
}

export default App;