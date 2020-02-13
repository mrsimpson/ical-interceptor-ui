import React from 'react'
import { PropTypes } from 'prop-types';

import './IcalSource.scss'

export default class ICalSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.onSubmit = props.onSubmit

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    this.onSubmit && this.onSubmit(this.state.url)
    event.preventDefault();
  }

  render() {
    return (
      <form className="ical-source" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <span>ical-URL</span>
          <input  className="form-field" 
                  type="text" 
                  placeholder="https://mrsimpson.o6s.io/ical-interceptor?url=https://outlook.office...ics?..." 
                  url={this.state.url} 
                  onChange={this.handleChange} />
        </div>

        {/* <input class="submit" type="submit" url="Submit" /> */}
      </form>
    );
  }
}

ICalSource.propTypes = {
  onSubmit: PropTypes.func.isRequired
};