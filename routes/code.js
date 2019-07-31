const router = require('koa-router')()
import request from 'request'


router.prefix('/code')



router.post('/', async (ctx) => {
  try {
    let code = ctx.request.body
    console.log(code)
    ctx.body = "ok"
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router
