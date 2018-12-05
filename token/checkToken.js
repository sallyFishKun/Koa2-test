/**
 * Created by Administrator on 2018/12/4 0004.
 */
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const config=require('../config')
//检查token是否过期
module.exports = async (token) =>{
  if (token) {
	let payload
	try{
	  payload = await verify(token, 'my_token')  // // 解密，获取payload
	  console.log(payload,"payload")
	}catch (err){
	  return false
	}
	return true
  } else {
	return false;
  }
};


//module.exports = async (ctx, next) => {
//  //拿到token
//  const authorization = ctx.get('Authorization');
//  if (authorization === '') {
//	console.log("....xxxx")
//	//ctx.throw(401, 'no token detected in http headerAuthorization');
//  }
//  const token = authorization.split(' ')[1];
//  let tokenContent;
//  try {
//	tokenContent = await jwt.verify(token, 'my_token');//如果token过期或验证失败，将抛出错误
//  } catch (err) {
//	ctx.throw(401, 'invalid token');
//  }
//  await next();
//
//};