import Koa from 'koa';
const app = new Koa();
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa2-cors';

// import session from 'koa-session';

//routes
import register from './routes/register'
import login from './routes/login';



//session
// app.keys = ['some secret hurr'];
// const CONFIG = {
//   key: 'cid', 
//   maxAge: 86400000,
//   autoCommit: false, 
//   overwrite: false, 
//   httpOnly: false, 
//   signed: false, 
//   rolling: false, 
//   renew: false, 
// };

// app.use(session(CONFIG, app));
// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;
 
//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors());


// app.use( async ( ctx ) => {
//   if ( ctx.url === '/' ) {
//     ctx.cookies.set(
//       'cid', //key
//       '45646598',//value
//       {
//         domain: 'localhost',  // 写cookie所在的域名
//         path: '/',       // 写cookie所在的路径
//         maxAge: 10 * 60 * 1000, // cookie有效时长
//         expires: new Date('2019-08-15'),  // cookie失效时间
//         httpOnly: false,  // 是否只用于http请求中获取
//         overwrite: false  // 是否允许重写
//       }
//     )
//     ctx.body = 'cookie is ok'
//   } else {
//     ctx.body = 'hello world' 
//   }
// })



app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
app.use(register.routes(), register.allowedMethods())
app.use(login.routes(), login.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
