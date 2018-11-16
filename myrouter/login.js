/**
 * Created by Administrator on 2018/11/15 0015.
 */
const router = require('koa-router')();
//console.log(router,"'./myrouter',")
router.get('/login/gettest', async (ctx, next) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body =` <div><span style="color: blue;">url：</span>${url}</div>
  	<br\>
    <div> <span style="color: blue;">从上下文的request对象中获取:</span> ${JSON.stringify({req_query,req_querystring })}</div>
    <br\>
  	<div><span style="color: blue;">从上下文中直接获取：</span> ${JSON.stringify({ctx_query,ctx_querystring})}</div>
  	<h3>结果可以看出他们的值是相等的</h3>
  	`

  await next();
});
router.get('/login', async (ctx, next) => {
  console.log(" login get")
	// 当GET请求时候返回表单页面
	let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/login">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
      <button onclick=' window.location.href="/"'>home</button>
    `
	ctx.body = html

  await next();
})
router.post('/login', async (ctx, next) => {
  console.log(" login post")
  let postData =ctx.request.body
  ctx.body ='<h4>'+ JSON.stringify(postData)+'</h4>';
  await next();
});
module.exports = router;