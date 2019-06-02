import React, { Component } from 'react';
import './SearchBox.scss';
import debounce from 'lodash/debounce';

interface SearchBoxPropType {
  queryHandler: Function
}

interface SearchBoxStateType {
  placeholder: string;
  query: string;
}

export default class SearchBox extends Component<SearchBoxPropType, SearchBoxStateType> {
    queryHandler: any;
    constructor(props: SearchBoxPropType) {
      super(props);
      this.queryHandlerDebounce = debounce(
        this.queryHandlerDebounce, 500 , {
          leading: false
        }
      );
      this.state = {
        placeholder: '搜索歌曲、歌手',
        query: ''
      }
    }

    setQuery = (query: string) => {
      this.setState({
        query: query
      })
    }

    onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      this.setState({
        query: e.target.value
      })
      this.queryHandlerDebounce(e.target.value);
    }
    queryHandlerDebounce = (value: string) => {
      this.props.queryHandler(value);
    }
    clear = () => {
      this.setState({
        query: ''
      })
      this.props.queryHandler('')
    }
    render() {
      const { placeholder, query } = this.state;
      console.log(query)
      return(
        <div className="search-box">
          <i className="icon-search" />
          <input 
            className="box"
            placeholder={placeholder}
            onChange={this.onChangeHandler.bind(this)}
            value={query}/>
          <i 
            className="icon-dismiss"
            onClick={this.clear}
            style={{display: query ? '' : 'none'}}
            />
        </div>
      )
    }
}