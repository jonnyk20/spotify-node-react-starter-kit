import React, { Component } from 'react';
import { Link } from "@reach/router"
class Home extends Component {

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>New to spotify Ops? <Link to="/signup">Sign Up!</Link></p>
        <p>Otherwise <Link to="/login">login</Link></p>
      </div>
    )
  }
}

export default Home;
