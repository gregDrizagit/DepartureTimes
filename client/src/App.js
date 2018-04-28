import React, { Component } from 'react';
import Home from './Home';
import {GoogleApiWrapper} from 'google-maps-react';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App
// export default App;
