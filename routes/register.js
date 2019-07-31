const router = require('koa-router')()
import { User,Buy } from '../db/model'


router.prefix('/register')

router.get('/', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/', async (ctx, next) => {
  const users = ctx.request.body
  if (users.username && users.password) {
    try {
      let _user = await User.findOne({ username: users.username })
      if (_user && _user.username === users.username) {
        ctx.body = { errCode: '用户名重复' }
        return
      }
      const user = new User(users)
      user.save().then(() => {
        console.log('保存成功')
        var story1 = new Buy({
          user_id: user._id,
          goods: ''    // assign the _id from the person
        });
        var story1 = new xxx({
          user_id: user._id,
          goods: ''    // assign the _id from the person
        });
        story1.save().then(()=>{console.log('关联成功')})
      });
      ctx.body = { errCode: 'register ok' }
    } catch (e) {
      console.log(e)
    }
  } else {
    ctx.body = { errCode: '好好看看接口' }
  }

})



module.exports = router
