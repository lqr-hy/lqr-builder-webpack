"use strict"

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './search.css'
class Search extends Component {
  render() {
    return (
      <div>
        <h1 className='title'>search</h1>
      </div>
    );
  }
}

ReactDOM.render(<Search/>, document.getElementById('root'))