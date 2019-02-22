import React, { Component } from 'react';
import SpotifyImages from "./SpotifyImages"
class Track extends Component {
  render() {
    return (
      <li><SpotifyImages images={this.props.data.album.images} />{this.props.data.name}</li>
    )
  }
}

export default Track;
