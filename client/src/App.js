import React, { Component } from 'react';
import Dashboard from "./Dashboard.js"
import SignUp from "./SignUp.js"
import LogIn from "./LogIn.js"
import Home from "./Home.js"
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import './App.css';
import { Router } from "@reach/router"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

let discoverId;
let bankId;
class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <SignUp path="signup"/>
            <LogIn path="login"/>
            <Dashboard path="dashboard"/>
            <Home path="/" />
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
