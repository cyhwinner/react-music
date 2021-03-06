import React, { Component } from 'react';
import './PlayList.scss';
import Scroll from 'reuse/scroll/Scroll';
import Confirm from 'reuse/confirm/Confirm';

import { ISequenceList } from 'store/stateTypes';

interface PlayListProps {
  changeMode: Function,
  iconMode: Function,
  modeText: Function,
  deleteSongList: Function,
  deleteSong : Function,
  getCurrentIcon: Function,
  selectItem: Function,
  scrollToCurrent: Function,
  sequenceList: ISequenceList
} 
interface PlayListState {
  showFlag: boolean
}

export default class PlayList extends Component<PlayListProps, PlayListState> {
  confirm: React.RefObject<Confirm>;
  listContent: React.RefObject<Scroll>;
  scrollSon: React.RefObject<HTMLUListElement>;
  constructor(props: PlayListProps) {
    super(props);
    this.confirm = React.createRef();
    this.listContent = React.createRef();
    this.scrollSon = React.createRef();
    this.state = {
      showFlag: false
    }
  }
  show = () => {
    this.setState({
      showFlag: true
    }, () => {
      if (!this.listContent.current || !this.scrollSon.current) return;
      this.listContent.current.refresh();
      this.props.scrollToCurrent(
        this.listContent.current,
        this.scrollSon.current.childNodes
      )
    })
  }
  hide = () => {
    this.setState({
      showFlag: false
    })
  }

  showConfirm = () => {
    if (!this.confirm.current) return;
    this.confirm.current.show();
   }

  render() {
    const { showFlag } = this.state;
    const {
      iconMode,
      changeMode,
      modeText,
      deleteSongList,
      sequenceList,
      getCurrentIcon,
      selectItem,
      deleteSong
    } = this.props;
    return(
      <div className="playlist" style={{display: showFlag ? "" : "none"}}>
        <div className="list-wrapper">
          <div className="list-header">
            <h1 className="title">
              <i className={'icon ' + iconMode()} onClick={() => changeMode()}/>
              <span className="text">{modeText()}</span>
              <span className="clear" onClick={this.showConfirm}>
                <i className="icon-clear"></i>
              </span>
            </h1>
          </div>
          <Scroll className="list-content" ref={this.listContent}>
            <ul ref={this.scrollSon}>
              {
                !!sequenceList.length && sequenceList.map((item, index) => (
                  <li className="item" key={index} onClick={() => selectItem(item, index)}>
                    <i className={'current' + getCurrentIcon(item)}></i>
                    <span className="text">{item.name}</span>
                    <span className="like">
                      <i className="icon-not-favorite"></i>
                    </span>
                    <span className="delete" onClick={(e) => {
                      e.stopPropagation();
                      deleteSong(item);
                    }}>
                      <i className="icon-delete"/>
                    </span>
                  </li>
                ))
              }
            </ul>
          </Scroll>
          <div className="list-operate">
            <div className="add">
              <i className="icon-add"></i>
              <span className="text">添加歌曲队列</span>
            </div>
          </div>
          <div className="list-close" onClick={this.hide}>
              <span>关闭</span>
          </div>
        </div>
        <Confirm
          ref={this.confirm}
          text="是否清空播放列表"
          confirmBtnText="清空"
          confirmHandler={deleteSongList} />
      </div>
    )
  }
}