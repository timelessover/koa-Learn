const router = require('koa-router')()
import  User  from '../db/model'

router.prefix('/login')


router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/', async (ctx, next) => {
  const users = ctx.request.body
  try {
    let user_name = await User.findOne({username:users.username})
    console.log(user_name)
    if (user_name === null) {
      ctx.body = {
        errMsg: '用户不存在'
      }
    }
    if (users.username === user_name.username && users.password === user_name.password) {
      const data = { name: "chris", age: 16 }
      ctx.body = data
    }else{
      ctx.body = {
        errMsg: '密码错误'
      }
    } 
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router
