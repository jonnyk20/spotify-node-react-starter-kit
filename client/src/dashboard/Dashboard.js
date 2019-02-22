import React, { Component } from 'react';
import Tops from './Tops'

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      term: "short_term"
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    return (
      <div className="dashboard">
        <select value={this.state.term} name="term" onChange={this.handleChange}>
          <option value="short_term">Short Term</option>
          <option value="medium_term">Medium Term</option>
          <option value="long_term">Long Term</option>
        </select>
        <div className="container">
          <div className="tracks">
            <h3>Tracks</h3>
            <Tops term={this.state.term} type="tracks" />
          </div>
          <div className="artists">
            <h3>Artists</h3>
            <Tops term={this.state.term} type="artists"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
