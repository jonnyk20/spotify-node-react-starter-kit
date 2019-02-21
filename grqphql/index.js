const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const mongo= require('mongoose');
const TopModel = require('./models/tops');
const test = require('./test_stuff');
const logger = require('koa-logger')
const genres = require("./resolvers/genres")
const tops = require('./resolvers/tops');


test();

mongo.connect('mongodb://localhost:27017/spotify', {useNewUrlParser: true});

const typeDefs = gql`
    type Album {
        id: String
        href: String
        name: String
    }
    type Artist {
        name: String
        genres: [String]
        id: String
    }
    type Track {
        name: String
        album: Album
        artists: [Artist]
        id: String
    }
    type ArchivedTop {
        user: String
        time_range: String
        createdAt: String
        artists: [Artist]
        tracks: [Track]
    }
    type Query {
        getArchivedTops(time_range: String, user: String): [ArchivedTop]
        getTopArtists(time_range: String, user: String): [Artist]
        getTopTracks(time_range: String, user: String): [Track]
        getGenres: [String]
    }
`;

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

const server = new ApolloServer({ typeDefs, resolvers, formatError: error => {
    console.log(error);
    return error;
  } });

const app = new Koa();
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});
app.on('error', (err, ctx) => {
    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
    */
    console.error("ERROR!!", JSON.stringify(err));
});
app.use(logger());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);