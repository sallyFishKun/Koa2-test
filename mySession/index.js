/**
 * Created by Administrator on 2018/11/16 0016.
 */
const config = require('../config')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

let store=new MysqlSession(config.mysql_config);

// 存放sessionId的cookie配置
let cookie = {
  //expires/maxAge 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session
  maxAge: '', // cookie有效时长 单位：毫秒数
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径,默认是'/'
  domain: '', // 写cookie所在的域名
  httpOnly: '', //是否只用于http请求中获取;  默认是 true ,客户端不可读取

  // 是否允许重写  一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false).
  // 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
  overwrite: '',

  secure: '',// 安全 cookie   默认false，设置成true表示只有 https可以访问
  sameSite: '',
  signed: '',

}
let SESSION_ID = session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
})
module.exports = {SESSION_ID }

//例子
//app.use( async ( ctx ) => {
//  // 设置session
//  if ( ctx.url === '/set' ) {
//	ctx.session = {
//	  user_id: Math.random().toString(36).substr(2),
//	  count: 0
//	}
//	ctx.body = ctx.session
//  } else if ( ctx.url === '/' ) {
//
//	// 读取session信息
//	ctx.session.count = ctx.session.count + 1
//	ctx.body = ctx.session
//  }
//
//})