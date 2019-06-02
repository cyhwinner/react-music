import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { ERR_OK } from 'api/config';
import MusicList from 'components/music-list/MusicList';
import { createSong } from 'common/js/song.js';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux'
import {
  ISong,
  IStoreState,
  ISinger,
  ITopList
} from 'store/stateTypes';

interface musicStateType {
  showMusicList: boolean;
  songs: Array<any>;
}

interface musicPropsType {
  musicList: ISinger | ITopList;
  history: any;
  isRank?: boolean;
  
}

export default (WrapperComponent: any, {getMusicList, isRank}: {getMusicList: Function, isRank: boolean})  => {
  class list extends Component<musicPropsType, musicStateType> {
    unmountedFlag: boolean;
    constructor(props: musicPropsType) {
      super(props);
      this.unmountedFlag = false;
      this.state = {
        showMusicList: true,
        songs: []
      }
    }
    back =() => {
      this.setState({
        showMusicList: false
      })
    }

    componentDidMount() {
      if (this.props.musicList && this.props.musicList.id < 0) {
        if (isRank){
          this.props.history.push('/rank')
        } else {
          this.props.history.push('/singer')
        }
        return;
      }
      this._getMusicList();
    }
    componentWillUnmount() {
      this.unmountedFlag = true;
    }
    _getMusicList = () => {
      getMusicList(this.props.musicList.id).then((data: any) => {
        if (data && !this.unmountedFlag) {
          this.setState({
              songs: this._normalizeSongs(data)
          })
      }
      })
    }
    _normalizeSongs = (list: Array<any>) => {
      let ret:any= []
        list.forEach((item) => {
            let musicData = item.data
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }
    render() {
      const { musicList, history } = this.props;
      const { songs, showMusicList } = this.state;
      return (
        <WrapperComponent 
        songs={songs} 
        musicList={musicList}
        showMusicList={showMusicList}
        back={() => this.back()}
        history={history}></WrapperComponent>
      )
    }
  }
  const mapStateToProps = (state: IStoreState, ownProps: any) => ({
    musicList: state.topList || state.singer,
    ...ownProps
  })

  return withRouter(connect(mapStateToProps)(list));
}

