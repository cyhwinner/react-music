import React, { Component, ReactNode } from 'react';
import BScroll from 'better-scroll';

interface scrollProps {
  children?: ReactNode,
  className?: string,
  scrollHandler?: Function,
  probeType?: number,
  pullUp?: boolean,
  pullUpHandler?: Function
}

interface scrollState {
  click: boolean,
  probeType: number,
  listenScroll: boolean
}

export default class Scroll extends Component<scrollProps, scrollState> {
  wrapper: React.RefObject<HTMLDivElement>;
  wrapperBS: any;
  constructor(props: scrollProps) {
    super(props);
    this.wrapper = React.createRef();
    this.wrapperBS = null;
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.state = {
      click: true,
      listenScroll: true,
      probeType: props.probeType || 2
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }
  componenntWillUnmount() {
    this.stop();
  }

  _initScroll() {
    if (!this.wrapper.current) {
      return;
    }
    this.wrapperBS = new BScroll(this.wrapper.current, {
      probeType: this.state.probeType,
      click: this.state.click
    })
    let {scrollHandler, pullUpHandler } = this.props;
    if (this.state.listenScroll) {
      this.wrapperBS.on('scroll', (pos: Object) => {
        scrollHandler && scrollHandler(pos);
      })

      this.wrapperBS.on('scrollEnd', (pos: Object) => {
        scrollHandler && scrollHandler(pos);
      })
    }
    if(this.props.pullUp) {
      this.wrapperBS.on('scrollEnd', () => {
        if (this.wrapperBS.y <= (this.wrapperBS.maxScrollY + 50)) {
          pullUpHandler && pullUpHandler();
        }
      })
    }
  }
  stop() {
    this.wrapperBS && this.wrapperBS.stop();
  }
  scrollTo(...args: any) {
    this.wrapperBS && this.wrapperBS.scrollTo.apply(this);
  }
  scrollToElement(...agrs: any) {
    this.wrapperBS && this.wrapperBS.scrollToElement.apply(this);
  }
  render() {
    return (
      <div ref={this.wrapper} className={this.props.className}>
        {this.props.children}
      </div> 
    )
  }

}