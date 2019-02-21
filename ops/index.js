
let cron = require('node-cron')
let Koa = require('koa')
let kRouter = require('koa-router')
let Spotify = require('./src/spotify')
let db = require('./src/db')
let {saveTop, getTop}= require('./src/top');
let TokenModel = require('./src/models/token')
let cors = require('@koa/cors');

console.info("Starting ops-cron!");

var app = new Koa();

let router = new kRouter();

//WE DON'T CARE ABOUT YOUR REST!
router.post('/db/setup', async (ctx, next)=> {
    console.info("**** CALLED DB SETUP ****");
    // Implemented, not using it though
    // await db();
    ctx.status = 200;
    next();
})
router.post('/top/save', async (ctx, next) => {
    console.info("**** CALLED SAVE TOP ****", JSON.stringify(ctx.state));
    await saveTop(ctx.state.spotify, ctx.state.user);
    console.info("*** SAVE TOP COMPLETED");
    ctx.status = 201;
    next();
});
router.get('/top', async (ctx, next) => {
    console.info("**** CALLED GET TOP ****", JSON.stringify(ctx.query));
    ctx.body = await getTop(ctx.state.spotify, ctx.query.time_range, ctx.query.type, ctx);
    ctx.status = 201;
    next();
});

router.get('/authentication', async (ctx, next)=> {
    console.info("**** CALLED AUTHENTICATION ****");

    // Check the email provided to see if we have it
    // For now, we have nothing
    ctx.status = 404;
    next();
})


// TODO
// rounter.post('/recommendations', async (ctx, next)=>{
//     console.info("**** CALLED RECOMMENDATIONS ****");
//     // extract seeds, make call to spotify
// })

app.use(async (ctx, next) => {
        let user = ctx.query.user;
        console.info("Recieved request:", ctx);
        try {
            if(user){
                let query = TokenModel.findOne({name: user});
                let token = await query.exec();
                console.info("initiating Spotify for token", token.token);
                ctx.state.spotify = await Spotify(token.token);
                ctx.state.user = token.name
                console.info("Spotify complete!", token.name);
            } else {
                console.info("No user specified")
            }
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    });
app.use(router.routes())
    .use(router.allowedMethods())
    .use(cors({
        origin: "*"
    }));
console.info("Listening on 8818");
app.listen(8818);
