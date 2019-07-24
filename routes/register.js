const router = require('koa-router')()
// import path from 'path'
// import fs from 'fs-extra';
import User from '../db/model'


router.prefix('/register')

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/', async (ctx, next) => {
  const users = ctx.request.body
  // console.log(users)
  try {
    let _user = await User.findOne({ username: users.username })
    if (_user && _user.username === users.username) {
      ctx.body = { errCode: '用户名重复' }
      return
    }
    const user = new User(users)
    user.save().then(() => console.log('保存成功'));
    ctx.body = { errCode: 'register ok' }
  } catch (e) {
    console.log(e)
  }
})



module.exports = router
