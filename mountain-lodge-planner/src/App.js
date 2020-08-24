import React, { Component } from 'react';
import Main from './containers/Main/Main'
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    )
  }
}

export default App;
