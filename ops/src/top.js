let mongo =require('mongoose')
let TopModel =require('./models/tops')
mongo.connect('mongodb://localhost:27017/spotify', {useNewUrlParser: true});
const options = {
    limit: 25
};
async function getTop(spotify, term, type, ctx){
    if(!term || !type){
        ctx.throw(400,"Must specify term and type");
    }
    let tops;
    if(type === "artists"){
        tops = await spotify.getMyTopArtists({time_range: term, ...options})
    } else if (type === "tracks"){
        tops = await spotify.getMyTopTracks({time_range: term, ...options})
    } else {
        ctx.throw(400,"Unsupported type specified " + type);
    }
    return tops;

}
async function saveTop(spotify, name){
    try{
        let terms = ["short_term", "long_term", "medium_term"];
        let artistPromises = terms.map(term => spotify.getMyTopArtists({time_range: term, ...options}));
        let trackPromises = terms.map(term => spotify.getMyTopTracks({time_range: term, ...options}))

        let [shortArt, longArt, mediumArt, shortTrack, longTrack, mediumTrack] = await Promise.all([...artistPromises, ...trackPromises]);
        console.info("Creating top now");
        // Save to top
        return await TopModel.create([
            {
                user: name,
                time_range: "short_term",
                artists: shortArt.body.items,
                tracks: shortTrack.body.items
            },
            {
                user: name,
                time_range: "long_term",
                artists: longArt.body.items,
                tracks: longTrack.body.items
            },
            {
                user: name,
                time_range: "medium_term",
                artists: mediumArt.body.items,
                tracks: mediumTrack.body.items
            }
        ]);

    } catch(err){
        console.error("Error getting Top", JSON.stringify(err));
    }
}
module.exports = {
    saveTop: saveTop,
    getTop: getTop
}

