/**
 * Created by Administrator on 2018/11/14 0014.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const staticServer = require('koa-static')//静态资源服务插件

const bodyParser = require('koa-bodyparser');//用来解析body的中间件
const registerRouter = require('./registerRouter.js')()
const path=require('path')
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '/static'
app.use(staticServer(__dirname , staticPath));

app.use(bodyParser());//这个koa-bodyparser必须在router之前被注册到app对象上。

// 对于任何请求，app将调用该异步函数处理请求：

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  if (ctx.url === '/') {
	//在首页写入cookies
	ctx.cookies.set(
		'cid',//name
		'hello world',//value
		{
		  domain: 'localhost',  // 写cookie所在的域名； 注意不要写端口号。
		  path: '/',       // 写cookie所在的路径
		  maxAge: 10 * 60 * 1000, // cookie有效时长
		  expires: new Date('2018-11-17'),  // cookie失效时间
		  httpOnly: false,  // 是否只用于http请求中获取
		  overwrite: false  // 是否允许重写
		}
	)

console.log('ok')

	ctx.body = `<div>
  <h1>hello world</h1>
  <img src="../static/1.png" style="display: block" alt="">
  <button onclick=' window.location.href="/login"'> login</button>
  </div>`
  }
  await next();
});

app.use(registerRouter);


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');