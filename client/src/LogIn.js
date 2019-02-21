import React, { Component } from 'react';
import { Link } from "@reach/router"
class LogIn extends Component {
  constructor(){
    super();

    this.state = {
      username: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    console.info('A value was submitted: ',this.state);
    //tbd...
    // document.location.href = `http://localhost:8888/something?name=${this.state.username}`

    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h3>Log in</h3>
        <p>If you've used Spotify Ops before, log in</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>New to spotify Ops? <Link to="/signup">Sign Up!</Link></p>
      </div>
    )
  }
}

export default LogIn;
