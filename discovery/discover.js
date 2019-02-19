let SpotifyWebApi = require("./auth");
function getPlaylistIdByName(playlists, name){
    let playlist = playlists.body.items.find(item => item.name === name);
    return playlist && playlist.id;
}
function getTracksToAdd(discover, bank){
    let discUri = discover.body.items.map(track => track.track.uri);
    let bankUri = bank.body.items.map(track => track.track.uri);

    return discUri.filter(uri =>{
        return !bankUri.includes(uri);
    });
}

exports.handler = async function saveDiscoverWeekly(event, context, callback){
    let spotifyApi = await SpotifyWebApi();
    console.info("Starting Discover weekly")
    let playlists;
    try{
        // TODO: Do I need a limit here?
        playlists = await spotifyApi.getUserPlaylists({
            params: {
                limit: 100
            }
        });
    } catch (err){
        console.error("Error getting user playlists: ", JSON.stringify(err));
        return;
    }

    // Get discover weekly ID
    let discoverId = getPlaylistIdByName(playlists, "Discover Weekly");

    // Get bank ID
    let bankId = getPlaylistIdByName(playlists, "Discover Bank");

    if(!discoverId || !bankId){
        throw "Playlist not found!";
    }

    let tracksToAdd;
    try {
        // Get tracks
        let [discoverTracks, bankTracks] = await Promise.all([spotifyApi.getPlaylistTracks(discoverId), spotifyApi.getPlaylistTracks(bankId)]);

        tracksToAdd = getTracksToAdd(discoverTracks, bankTracks);
        console.info("Adding", tracksToAdd.length, "tracks");
    } catch (err){
        console.error("Error getting playlist tracks ", JSON.stringify(err));
        return
    }

    if(!tracksToAdd.length){
        console.info("No tracks to add!")
        return;
    }
    try {
        await spotifyApi.addTracksToPlaylist(
            bankId,
            tracksToAdd
        );
        console.info("Tracks saved successfully");
    } catch (err){
        console.error("Error saving tracks to bank: ", JSON.stringify(err));
        return
    }
}
