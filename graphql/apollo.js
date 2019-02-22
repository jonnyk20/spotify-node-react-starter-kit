const { ApolloServer} = require('apollo-server-koa');
const types = require("./types")
const TopModel = require('./models/tops');
const genres = require("./resolvers/genres")
const tops = require('./resolvers/tops');

const resolvers = {
    Query: {
        async getArchivedTops(parent, args, context, info){
            console.info("Getting tops for", args.user, args.time_range);
            return TopModel.find({user:args.user, time_range:args.time_range}).exec();
        },
        async getTopArtists(parent, args, context, info){
            args.type = "artists";
            return await tops(parent, args, context, info)
        },
        async getTopTracks(parent, args, context, info){
            args.type = "tracks";
            return await tops(parent, args, context, info)
        },
        getGenres(){
            return genres;
        }
    }
};

module.exports = new ApolloServer({ typeDefs: types, resolvers, formatError: error => {
    console.log(error);
    return error;
  } });