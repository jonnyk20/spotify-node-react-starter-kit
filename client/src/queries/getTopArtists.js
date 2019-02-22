
import gql from "graphql-tag";
function getTopTracks(user){
  return gql`
    query {
      short_term:getTopArtists(time_range:"short_term", user:"${user}") {
        name
        id
        genres
        images {
          url
          width
          height
        }
      }
      medium_term:getTopArtists(time_range:"medium_term", user:"${user}") {
        name
        id
        genres
        images {
          url
          width
          height
        }
      }
      long_term:getTopArtists(time_range:"long_term", user:"${user}") {
        name
        id
        genres
        images {
          url
          width
          height
        }
      }
    }`;
}


export default getTopTracks;
