
let cron = require('node-cron')
let Koa = require('koa')
let kRouter = require('koa-router')
let auth = require('./src/auth')
let db = require('./src/db')
let saveTop= require('./src/top')
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
                console.info("initiating auth for token", token.token);
                ctx.state.spotify = await auth(token.token);
                ctx.state.user = token.name
                console.info("Auth complete!");
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
