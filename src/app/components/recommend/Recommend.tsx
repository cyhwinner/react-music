import React, {Component} from 'react';
import { getRecommend, getDiscList } from 'api/recommend';
import './recommend.scss';
import { connect } from 'react-redux';
import { ERR_OK } from 'api/config';
import Carousel from 'reuse/carousel/Carousel';
import Scroll from 'reuse/scroll/Scroll';
import LazyImage from 'reuse/lazyimg/lazyImg';
import Loading from 'reuse/loading/Loading';
import {Route, withRouter } from 'react-router';
import Disc from 'components/disc/Disc';
import { setDisc } from 'actions/disc'
import { IDisc } from 'store/stateTypes'
import { Dispatch } from 'redux';

interface Props {
  setDisc: Function,
  history: any,
  location: any,
  match: any
}

interface State{
  recommend: Array<any>,
  discList: Array<any>,
}
let cacheData: {
  recommend: Array<any>,
  discList: Array<any>,
}

class Recommend extends Component<Props, State> {
  unmountedFlag: boolean;
  constructor(props: Props) {
    super(props);
    this.unmountedFlag = false;
    this.state = {
      recommend: [],
      discList: []
    }
  }
  componentDidMount() {
    console.log(cacheData);
    if (cacheData) {
      this.setState({
        recommend: cacheData.recommend,
        discList: cacheData.discList,
      })
    } else {
      this.getRecommend();
      this.getDiscList();
    }
  }
  componentWillUnmount() {
    cacheData = {
      recommend: this.state.recommend,
      discList: this.state.discList
    }
    this.unmountedFlag = false;
  }
  getRecommend() {
    getRecommend().then(res => {
      if (res.code === ERR_OK && !this.unmountedFlag) {
        this.setState({
          recommend: res.data.slider
        })
      }
    })
  }
  getDiscList() {
    getDiscList().then((res) => {
      if (res.code === ERR_OK && !this.unmountedFlag) {
        this.setState({
          discList: res.data.list
        })
      }
    }) 
  }
  selectDisc = (disc: any) => {
    this.props.history.push(`/recommend/${disc.dissid}`);
    this.props.setDisc(disc);
  } 
    render() {
      const { recommend, discList } = this.state;
        return (
          <div className="recommend">
            <Scroll className="recommend-content">
              <div>
                <div className="slider-wrapper">
                  {
                    !!recommend.length && 
                    <Carousel>
                      {
                        recommend.map((item, index) => (
                          <div key={index}>
                            <a href={item.linkUrl}>
                              <img src={item.picUrl} alt={'第' + index + 1  + '张图片'}/>
                            </a>
                          </div>
                        ))
                      }
                    </Carousel>
                  }
                </div>
                <div className="recommend-list">
                  <h1 className="list-title">热门歌单推荐</h1>
                  <ul>
                    {
                      !!discList.length && discList.map((item, index) => (
                        <li className="item" key={index} onClick={() => this.selectDisc(item)}>
                          <div className="icon">
                            <LazyImage 
                              className="discListLazy"
                              containerClassName="recommend"
                              sizes="200px"
                              src="https://placehold.it/200x300?text=Image1"
                              srcset={item.imgurl}
                              width="60"
                              height="60"
                            />
                          </div>
                          <div className="text">
                            <h2 className="name">{item.creator.name}</h2>
                            <p className="desc">{item.dissname}</p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              {
                !discList.length && 
                <div className="loading-container">
                  <Loading />
                </div>
              }
            </Scroll>
            <Route path="/recommend/:id" component={Disc} />
          </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDisc: (disc: IDisc) => {
    dispatch(setDisc(disc))
  }
})

export default withRouter(connect(() => ({}), mapDispatchToProps)(Recommend));