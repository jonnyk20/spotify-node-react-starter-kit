const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const mongo= require('mongoose');
const TopModel = require('./models/tops');
const test = require('./test_stuff');
const logger = require('koa-logger')
const genres = require("./resolvers/genres")

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
    }
    type Track {
        name: String
        album: Album
        artists: [Artist]
    }
    type Top {
        user: String
        time_range: String
        createdAt: String
        artists: [Artist]
        tracks: [Track]
    }
    type Query {
        getTops(time_range: String, user: String): [Top]
        getGenres: [String]
    }
`;

const resolvers = {
    Query: {
        async getTops(parent, args, context, info){
            console.info("Getting tops for", args.user, args.time_range);
            return TopModel.find({user:args.user, time_range:args.time_range}).exec();
        },
        getGenres(){
            return genres;
        }
    },
    Top: {
        artists(top) {
            return top.artists;
        },
        tracks(top) {
            return top.tracks;
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