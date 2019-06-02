import React, { Component } from 'react';
import './Singer.scss';
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import ListView from 'reuse/listview/ListView';
import SingerClass from 'common/js/singer.js';
import { Route, withRouter } from 'react-router';
import SingerDetail from '../singer-detail/SingerDetail';
import { connect } from 'react-redux';
import { setSinger } from 'actions/singer';
import { ISinger } from 'store/stateTypes';
import { Dispatch } from 'redux';

interface hotType {
  title: string;
  items: Array<ISinger>;
}

class mapType {
  hot: hotType;
  [index: string]: hotType;
  constructor(hotName: string) {
    this.hot = {
      title: hotName,
      items: []
    }
  }
}

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';

interface singerProps {
  setSinger: Function;
  history: any;
}

interface singerState {
  singers: Array<hotType>
}

let cacheData: {
  singers: Array<hotType>
}

class SingerBase extends Component<singerProps, singerState> {
  unmountedFlag: boolean;
  constructor(props: singerProps) {
    super(props);
    this.unmountedFlag = false;
    this.state = {
      singers: []
    };
  }

  componentDidMount() {
    if (cacheData) {
      this.setState({
        singers: cacheData.singers
      })
    } else {
      this._getSingerList()
    }
  }
  componentWillUnmount() {
    cacheData = {
      singers: this.state.singers
    }
    this.unmountedFlag = true;
  }
  _getSingerList = () => {
    getSingerList().then((res) => {
      if (res.code === ERR_OK && !this.unmountedFlag) {
        this.setState({
          singers: this._normalizeSingers(res.data.list)
        })
      }
    })
  }
  _normalizeSingers(list: Array<any>) {
    let map = new mapType(HOT_NAME);
    list.forEach((item, index) => {
      let singer = new SingerClass({
        name: item.Fsinger_name,
        id: item.Fsinger_mid
      })
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(singer);
      }
      const key = item.Findex;
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(singer);
    })
    let ret = [];
    let hot = [];
    for(let key in map) {
      let val = map[key];
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val);
      } else if (val.title === HOT_NAME) {
        hot.push(val);
      }
    }
    ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    return hot.concat(ret);
  }

  selectSinger = (singer: SingerClass) => {
    this.props.history.push(`/singer/${singer.id}`);
    this.props.setSinger(singer);
  }
  render() {
    const { singers } = this.state;
    return (
      <div className="singer">
        <ListView data={singers} getItem={this.selectSinger}/>
        <Route path="/singer/:id" component={SingerDetail} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {
    setSinger: (singer: ISinger) => (
      dispatch(setSinger(singer))
    )
  }
}

const Singer = withRouter(connect(() => ({}), mapDispatchToProps)(SingerBase));
export default Singer;