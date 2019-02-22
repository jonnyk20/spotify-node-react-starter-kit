const Koa = require('koa');
const server = require('./apollo');

const mongo= require('mongoose');
const logger = require('koa-logger')

mongo.connect('mongodb://localhost:27017/spotify', {useNewUrlParser: true});

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