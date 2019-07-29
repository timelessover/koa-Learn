const router = require('koa-router')()
import {User} from '../db/model'
import fs from 'fs-extra';
import jwt from 'jsonwebtoken'
import svgCaptcha from 'svg-captcha'

router.prefix('/login')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/', async (ctx, next) => {
  try {
    const users = ctx.request.body
    console.log(users)
    let user_name = await User.findOne({username:users.username})
    console.log(user_name)
    if (user_name === null) {
      ctx.body = {
        errMsg: '用户不存在'
      }
    }
    if (users.password === user_name.password) {
      try {
        ctx.body = {
          message: '登录成功',
          // 生成 token 返回给客户端
          token: jwt.sign({
            user: users.username,
           }, 
           'my_token', { expiresIn: '2h' } 
          )
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      ctx.body = {
        errMsg: '密码错误'
      }
    }
  }
  catch (err) {
    console.log(err)
  }
})
router.post('/code',async (ctx) => {
  var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
    size:4,    //验证码长度
    fontSize:50,   //字体大小
    width:100,
    height:40,
    background:'#cc8801'
  });
  console.log(captcha.text);
  ctx.response.type = 'image/svg+xml';
  ctx.body = captcha.data;
});

module.exports = router
