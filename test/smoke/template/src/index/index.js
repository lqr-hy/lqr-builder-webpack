"use strict"

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less'
class Index extends Component {
  render() {
    return (
      <div>
        <h1 className='title'>Index</h1>
      </div>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'))