import React, { Component } from 'react';
import LazyLoad from 'common/js/lazyload.es2015.js';
import logo from './logo@2x.png';

interface LazyImageProps {
  className: string,
  alt?: string,
  src?: string,
  srcset?: string,
  sizes?: string,
  width?: string,
  height?: string,
  containerClassName?: string
}

export default class LazyImage extends Component <LazyImageProps> {
  lazyLoadInstance: any
  constructor(props: LazyImageProps) {
    super(props);
    this.lazyLoadInstance = null;
  }
  componentDidMount() {
    if (!this.lazyLoadInstance) {
      let container;
      try{
        container = document.getElementsByClassName(this.props.containerClassName + '')[0];
      } catch(err) {
        container = null;
      };
      const lazyloadConfig = {
        elements_selector: '.' + this.props.className.split(" ")[0],
        container: container,
        threshold: 0
      }
      this.lazyLoadInstance = new LazyLoad(lazyloadConfig);
    }
    this.lazyLoadInstance.update();
  }
  render() {
    const { alt, srcset, sizes, width, height, className } = this.props;
    let src = this.props.src ? this.props.src : logo;
    return (
      <img 
        src={logo}
        className={className}
        data-src={src}
        data-srcset={srcset}
        data-size={sizes}
        width={width}
        height={height} 
        alt={alt}
         />
    )
  }
}