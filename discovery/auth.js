const SpotifyWebApi = require('spotify-web-api-node');
let credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/callback'
};
console.info("Setting up with creds:", JSON.stringify(credentials));
const spotifyApi = new SpotifyWebApi(credentials);

module.exports = async function setAuth(){
    let refresh = process.env.SPOTIFY_REFRESH;
    console.info("Using refresh:", refresh);
    spotifyApi.setRefreshToken(refresh);
    try{
        let response = await spotifyApi.refreshAccessToken();
        console.info("Refresh Access Token:", JSON.stringify(response.body))
        spotifyApi.setAccessToken(response.body.access_token);
        return spotifyApi;
    } catch(err){
        console.error("ERROR:", JSON.stringify(err));
    }
}

