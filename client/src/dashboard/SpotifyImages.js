import React, { Component } from 'react';

class SpotifyImages extends Component {
    

  render() {
    const image = this.props.images.sort((a, b)=>a.height - b.height)[0].url

    return (
      <img src={image}/>
    )
  }
}

export default SpotifyImages;
