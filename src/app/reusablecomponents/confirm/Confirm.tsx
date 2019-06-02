import React, { Component } from 'react';
import './Confirm.scss';

interface ConfirmProps {
  text: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  confirmHandler: Function;
}

interface ConfirmState {
  showFlag: boolean;
}

export default class Confirm extends Component<ConfirmProps, ConfirmState> {
  constructor(props: ConfirmProps) {
    super(props);
    this.state = {
      showFlag: false
    }
  }

  show = () => {
    this.setState({
      showFlag: true
    })
  }

  hide = () => {
    this.setState({
      showFlag: false
    })
  }

  cancel = () => {
    this.hide();
  }
  confirm = () => {
    this.hide();
    this.props.confirmHandler();
  }

  render() {
    const { text, cancelBtnText = "取消", confirmBtnText = "确认" } = this.props;
    const { showFlag } = this.state;
    return (
      <div 
        className="confirm"
        style={{display: showFlag? "" : "none"}}>
        <div className="confirm-wrapper">
          <div className="confirm-content">
            <p className="text">{ text }</p>
            <div className="operate">
              <div 
                className="operate-btn left" 
                onClick={this.cancel}>{ cancelBtnText }</div>
              <div className="operate-btn" onClick={this.confirm}>{ confirmBtnText }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}