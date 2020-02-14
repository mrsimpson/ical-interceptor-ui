import React from 'react';
import CalendarPreview from './CalendarPreview'
import IcalSource from './IcalSource'

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  setUrl = (url) => { // important: Arrow function to update THIS, the global state!
    this.setState({ url })
    console.log('setURL', this.state.url)
  }

  componentDidUpdate() {
    console.log('UPDATED', this.state.url)
  }

  render() {
    const { url } = this.state
    return (
      <div className="App">
        <IcalSource onSubmit={this.setUrl} />
        <CalendarPreview url={url} />
      </div>
    )
  }
}

export default App;
