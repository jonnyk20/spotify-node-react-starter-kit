import React, { Component } from 'react';
import SpotifyImages from "./SpotifyImages"

class Artist extends Component {
  render() {
    return (
      <li><SpotifyImages images={this.props.data.images} />{this.props.data.name}</li>
    )
  }
}

export default Artist;
