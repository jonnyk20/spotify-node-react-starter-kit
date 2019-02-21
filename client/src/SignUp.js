import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();

    this.state = {
      username: "",
      usercode: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    console.info('A value was submitted: ',this.state);
    document.location.href = `http://localhost:8888/login?name=${this.state.username}&code=${this.state.usercode}`
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h3>Sign up!</h3>
        <p>If you've never used Spotify Ops, go ahead and sign up...</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Code:
            <input type="text" name="usercode" value={this.state.usercode} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default App;
