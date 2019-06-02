import React,{ Component } from 'react'
import './TopList.scss'
import { CSSTransition } from 'react-transition-group'
import { getMusicList } from 'api/rank.js'
import { connect } from 'react-redux'
import {ERR_OK} from 'api/config'
import MusicList from 'components/music-list/MusicList'
import { createSong } from 'common/js/song.js'
import { withRouter } from 'react-router';
import wrapListComponent from 'reuse/container-list/list';

import {
    ISong,
    IStoreState,
    ITopList
} from 'store/stateTypes'

interface DiscBaseStateType{
    songs:Array<any>
}

interface DiscBasePropType{
    musicList:ITopList,
    songs: Array<any>,
    history:any,
    showMusicList: boolean,
    back: Function
}

class TopList extends Component<DiscBasePropType, DiscBaseStateType>{
    render(){
        const { musicList, songs, showMusicList, back } = this.props;
        const bgImage = songs[0] && songs[0].image;
        return(
            <CSSTransition
                in={showMusicList}
                timeout={500}
                classNames="top-list-transition"
                appear={true}
                unmountOnExit
                onExited = { () => {
                     this.props.history.goBack()
                } }>
              <MusicList rank={true} singerName={musicList.topTitle} bgImage={bgImage} songs={songs} back={back} />
            </CSSTransition>
        )
    }
}

export default wrapListComponent(TopList, {getMusicList, isRank:true});


