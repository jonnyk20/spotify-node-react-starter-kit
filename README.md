# spotify-api-intro
This Repo is the result of a tutorial that teaches how to use Spotify's API with react.
It's a siple app that allos users to see what song they currently have playing on Spotify.
There are two parts to it, the auth-server, and the client. 

## Getting Statrted

### 1) Create an App
- Visit https://developer.spotify.com/ 
- Log in and create an app
- Enter http//localhost:8888/callback as the redirect uri
- Save your changes
- Copy down the following: Redirect uri, client id, client secret


### 2)  Start Auth Server
- Navigate to the auth-server directory `cd auth-server`
- Install the dependencies `npm install`
- Paste in the redirect uri, client id, and client secret you copied in step 1
- Run the Server `node authorization_code/app.js`

### 3)  Start Client
- Navigate to the auth-server directory `cd client`
- Install the dependencies `npm install`
- Run the Server `npm start`

### 4)  Use the App
- Make sure you have a song playing (or paused) on a Spotify app
- Visit http://localhost:3000
- Click 'Log in with Spotify' and log in
- Click the 'Check Now Playing' Button
- Your currently playing song's name and album art should appear

