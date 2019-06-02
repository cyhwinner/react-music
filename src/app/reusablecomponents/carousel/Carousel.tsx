import React, {Component} from 'react';
import { addClass } from 'common/js/dom.js';
import BScroll from 'better-scroll';
import './carousel.scss';
interface componentsProps {
    children: any
}

interface componentState {
    loop: boolean,
    threshold: number,
    autoPlay: boolean,
    interval: number,
    showDot: boolean,
    click: boolean,
    speed: number,
    currentPageIndex: number,
    dots: Array<any>
}

class Carousel extends Component<componentsProps, componentState> {
    carousel: React.RefObject<HTMLDivElement>;;
    carouseGroup: React.RefObject<HTMLDivElement>;;
    children: any;
    resizeTimer: any;
    carouselBS: any;
    timer: any;
    constructor(props: componentsProps) {
        super(props);
        this.carousel = React.createRef();
        this.carouseGroup = React.createRef();
        this.resizeTimer = null;
        this.carouselBS = null;
        this.children = null;
        this.timer = null;
        this.state = {
          loop: true,
          autoPlay: true,
          interval: 4000,
          showDot: true,
          click: true,
          threshold: 0.3,
          speed: 400,
          dots: [],
          currentPageIndex: 0
        }
    }

    componentDidMount() {
      this.update();
      window.addEventListener('resize', () => {
        if (!this.carouselBS || !this.carouselBS.enabled) return;

        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.carouselBS.isInTransition) {
            this._onScrollEnd();
          } else {
            if (this.state.autoPlay) {
              this._play();
            }
          }
          this.refresh();
        }, 60);
      })
    };
    componentWillUnmount() {
      clearTimeout(this.timer);
      clearTimeout(this.resizeTimer);
    }
    update() {
      this.carouselBS && this.carouselBS.destroy();
      this.init();
    }
    init() {
      clearTimeout(this.timer);
      this.setState({
        currentPageIndex: 0
      });
      this._setSliderWidth();
      if (this.state.showDot) {
        this._initDots();
      }
      this._initSlider();
      if (this.state.autoPlay) {
        this._play();
      }
    }
    _initSlider() {
      if (!this.carousel.current) return;
      this.carouselBS = new BScroll(this.carousel.current, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.state.loop,
          threshold: this.state.threshold,
          speed: this.state.speed
        },
        bounce: false,
        stopPropagation: true,
        click: this.state.click
      })
      this.carouselBS.on('scrollEnd', this._onScrollEnd.bind(this));
      this.carouselBS.on('touchEnd', () => {
        if (this.state.autoPlay) {
          this._play();
        }
      })
      this.carouselBS.on('beforeScrollStart', () => {
        if (this.state.autoPlay) {
          clearTimeout(this.timer);
        }
      })
    }
    refresh() {
      this._setSliderWidth(true);
      this.carouselBS.refresh();
    }
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.carouselBS.next();
      }, this.state.interval);
    }
    _onScrollEnd() {
      let pageIndex = this.carouselBS.getCurrentPage().pageX;
      this.setState({
        currentPageIndex: pageIndex
      })
      if (this.state.autoPlay) {
        this._play();
      }
    }
    _initDots() {
      this.setState({
        dots: new Array(this.children.length).fill(0)
      })
    }
    _setSliderWidth(isResize: boolean=false) {
      if (!this.carouseGroup.current || !this.carousel.current) return;
      this.children = this.carouseGroup.current.children;
      let childLength = this.children.length;
      let width = 0;
      let sliderWidth = this.carousel.current.clientWidth;
      if (this.state.loop && !isResize) {
        width = (childLength + 2) * sliderWidth
      } else {
        width = childLength * sliderWidth;
      }
      for(let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, 'carousel-item');
        child.style.width = sliderWidth + 'px';
        // width += sliderWidth;
      }
      if (this.state.loop && !isResize) {
        // width += 2 * sliderWidth;
      }
      this.carouseGroup.current.style.width = width + 'px';
      // Array.from(this.children).forEach(child => {
      //   addClass(child, 'carousel-item');
      //   child.style.width = sliderWidth;
      // })
    }

    render() {
      const {dots, currentPageIndex} = this.state;
      return (
        <div className="carousel" ref={this.carousel}>
          <div className="carousel-group" ref={this.carouseGroup}>
            {this.props.children}
          </div>
          <div className="dots">
            {
              dots.length && dots.map((item, index) => {
                return <span className={"dot" + (currentPageIndex === index ? " active" : "")} key={index}></span>
              })
            }
          </div>
        </div>
      )
    }
}

export default Carousel;