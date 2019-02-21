let SpotifyWebApi = require('spotify-web-api-node');
let credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/callback'
};

const spotifyApi = new SpotifyWebApi(credentials);


module.exports = async function setAuth(refresh){
    spotifyApi.setRefreshToken(refresh);
    try{
        let response = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(response.body.access_token);
        return spotifyApi;
    } catch(err){
        console.error("ERROR SETTING UP AUTH:", JSON.stringify(err));
    }
}

