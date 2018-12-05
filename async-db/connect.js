/**
 * Created by Administrator on 2018/11/20 0020.
 */
let mysql=require('mysql');
let config=require('../config')
// 使用createConnection方法创建一个表示与mysql数据库服务器之间连接的connection对象
//let connection=mysql.createConnection(config.mysql_config);
//建立连接。
//connection.connect(err=>{
//  if(err){
//	return console.error('error',err.message);
//
//  }
//  console.log('connected...')
//})
module.exports={
  query:(sql,params,callback)=>{
	//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
	let connection=mysql.createConnection(config.mysql_config);
	//开始数据操作
	//传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
	connection.query(sql,params,(err,results,fields)=>{
	  if(err){
		console.log('sql error',err.message);
	  }
	  //将查询出来的数据返回给回调函数
	  callback&&callback(results,fields)
	})
	//results作为数据操作后的结果，fields作为数据库连接的一些字段
	//停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
	connection.end((err)=>{
	  if(err){
		console.log('close sql connection fail')
	  }
	})

  }

}

//使用方式
//var db=require('../model/mysql.js');
//// 查询实例
//db.query('select * from t_user', [],function(result,fields){
//  console.log('查询结果：');
//  console.log(result);
//});
////添加实例
//var  addSql = 'INSERT INTO websites(username,password) VALUES(?,?)';
//var  addSqlParams =['咕噜先森', '666'];
//db.query(addSql,addSqlParams,function(result,fields){
//  console.log('添加成功')
//})