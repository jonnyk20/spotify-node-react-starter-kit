import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GETTOPS = gql`
    query {
      getTops(time_range:"short_term", user:"Darren") {
        user
        time_range
        artists {
          name
          genres
        }
        tracks {
          name,
          artists {
            name
          }
        }
      }
    }`;
class App extends Component {
  constructor(){
    super();

    this.state = {
      artists:{
        short_term: [],
        medium_term: [],
        long_term: []
      },
      tracks: {
        short_term: [],
        medium_term: [],
        long_term: []
      }
    }
  }
  render() {
    return (<Query
    query={GETTOPS}
    >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getTops.map(({ artists, tracks }) => (
        <div>
          <p>Artists: {artists.length}</p>
          <p>Tracks: {tracks.length}</p>
        </div>
      ));
    }}
    </Query>)
  }
}

export default App;
