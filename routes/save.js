const router = require('koa-router')()
import { Data } from '../db/model'
import fs from 'fs-extra';
import svgCaptcha from 'svg-captcha'
import jwt from 'jsonwebtoken'

router.prefix('/v1')

router.get('/', async (ctx, next) => {
    //   const findData = await Data.find({ 'appkey': 'sss' })
    ctx.body = 'findData'
})

router.post('/', async (ctx, next) => {
    console.log(ctx)
    try {
        let token = ctx.header.authorization
        console.log(token)
        let payload = jwt.verify(token.split(' ')[1], 'my_token');
        ctx.body = payload
    }
    catch (err) {
        console.log(err)
    }
})
// router.post('/code',async (ctx) => {
//   var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
//     size:4,    //验证码长度
//     fontSize:50,   //字体大小
//     width:100,
//     height:40,
//     background:'#cc8801'
//   });
//   console.log(captcha.text);
//   ctx.response.type = 'image/svg+xml';
//   ctx.body = captcha.data;
// });

module.exports = router
