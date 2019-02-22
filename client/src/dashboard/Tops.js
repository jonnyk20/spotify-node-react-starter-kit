import React, { Component } from 'react';
import { Query } from "react-apollo";
import getTopTracks from "../queries/getTopTracks"
import getTopArtists from "../queries/getTopArtists"
import Track from "./Track"
import Artist from "./Artist"
class Tops extends Component {

  
  render() {
    const GETTRACKS = getTopTracks("Darren")
    const GETARTISTS = getTopArtists("Darren")
    return (
      <ul>
        <Query
        query={this.props.type === "artists" ? GETARTISTS : GETTRACKS}>

        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data[this.props.term].map(data => {
            if(this.props.type === "artists"){
              return (<Artist data={data} />)
            }
            return(
              <Track data={data} />
            )
          });
        }}
        </Query>
      </ul>
    )
  }
}

export default Tops;
