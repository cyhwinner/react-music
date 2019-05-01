import React, { Component } from 'react';
import './loading.scss'
import loadingGif from './loading.gif';

interface loadingProps {
  text?: string
}

const Loading: React.SFC<loadingProps> = ({text= '正在输入...'}) => (
  <div className="loading">
    <img src={loadingGif} width="24" height="24"/>
    <p className="des">{text}</p>
  </div>
)

export default Loading;