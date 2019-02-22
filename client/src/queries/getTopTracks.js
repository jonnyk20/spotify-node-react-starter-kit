
import gql from "graphql-tag";
function getTopTracks(user){
  return gql`
    query {
      short_term:getTopTracks(time_range:"short_term", user:"${user}") {
        name
        id
        artists {
          name
        }
        album {
          images {
            url
            width
            height
          }
        }
      }
      medium_term:getTopTracks(time_range:"medium_term", user:"${user}") {
        name
        id
        artists {
          name
        }
        album {
          images {
            url
            width
            height
          }
        }
      }
      long_term:getTopTracks(time_range:"long_term", user:"${user}") {
        name
        id
        artists {
          name
        }
        album {
          images {
            url
            width
            height
          }
        }
      }
    }`;
}


export default getTopTracks;
