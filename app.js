/**
 * Created by Administrator on 2018/11/14 0014.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

const config=require('./config')
const bodyParser = require('koa-bodyparser');//用来解析body的中间件
app.use(bodyParser());//这个koa-bodyparser必须在router之前被注册到app对象上。

const path = require('path')

const staticServer = require('koa-static')//静态资源服务插件
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '/static'
app.use(staticServer(__dirname, staticPath));

const {SESSION_ID }= require('./mySession/index.js')
// 使用session中间件
app.use(SESSION_ID)
app.use( async ( ctx ) => {
  // 设置session
  if ( ctx.url === '/set' ) {
	ctx.session = {
	  user_id: Math.random().toString(36).substr(2),
	  count: 0
	}
	ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

	// 读取session信息
	ctx.session.count = ctx.session.count + 1
	ctx.body = ctx.session
  }

})

// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
// 下面以koa2-cors为例，
const cors = require('koa-cors');
// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
	if (ctx.url === '/test') {
	  return "*"; // 允许来自所有域名请求
	}
	return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const registerRouter = require('./registerRouter.js')()
app.use(registerRouter);

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
	console.log(err)
	if(err.status === 401){
	  ctx.status = 401;
	  ctx.response.body={
		ReturnCode:"FAIL",
		ReturnMsg:'token 失效',
	  }

	}else{
	  throw err;
	}
  })
})
const koajwt = require('koa-jwt');
//通过 app.use 来调用该中间件，并传入密钥 {secret: 'my_token'}，unless 可以指定哪些 URL 不需要进行 token 验证。
app.use(koajwt({
  secret: config.secret
}).unless({
  path: [/\api\/AlarmHandle\/GetLogin/]

}));

// 对于任何请求，app将调用该异步函数处理请求：
//app.use(async (ctx, next) => {
//  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//  if (ctx.url === '/login') {
//	//在首页写入cookies
//	ctx.cookies.set(
//		'cid',//name
//		'hello world',//value
//		{
//		  //expires: new Date('2018-11-17'),  // cookie失效时间
//		  maxAge: 10 * 60 * 1000, // cookie有效时长
//		}
//	)
//	//i
//  }
//
//  if (ctx.url === '/') {
//	ctx.cookies.set('cid', '', { maxAge: 0})
//	console.log('ok')
//
//	//ctx.body = `<div>
//  //<h1>hello world</h1>
//  //<img src="../static/1.png" style="display: block" alt="">
//  //<button onclick=' window.location.href="/login"'> login</button>
//  //</div>`
//  }
//  await next();
//});


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');