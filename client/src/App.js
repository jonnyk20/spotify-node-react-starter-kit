import React, { Component } from 'react';
import Portal from "./Portal.js"
import SignUp from "./SignUp.js"
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import './App.css';
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
            <SignUp />
            <Portal />
          </div>
      </ApolloProvider>
    );
  }
}

export default App;
