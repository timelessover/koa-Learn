const router = require('koa-router')()
import http from '../bin/www'
const io = require('socket.io')(http);

  

router.prefix('')
router.get('/',async(ctx)=>{
    await ctx.render('index.html')
    io.on('connection', function(socket){
        console.log('a user connected');
      });
})

module.exports = router