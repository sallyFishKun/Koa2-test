/**
 * Created by Administrator on 2018/11/16 0016.
 * 连接池管理会话
 * 封装一个query函数，可以执行SQL语句
 */
const mysql = require('mysql');
const config=require('../config');

console.log(config.mysql_config.database,"config.mysql_config")
// 创建数据池
const pool = mysql.createPool(config.mysql_config)

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
	// 在数据池中进行会话操作
	pool.getConnection((err, connection)=> {
	  // 如果有错误就抛出
	  if (err) {
		reject( err )
	  } else {
		connection.query(sql, values, ( err, rows) => {
		  if ( err ) {
			reject( err )
		  } else {
			resolve( rows )
		  }
		  // 结束会话
		  connection.release()
		})
	  }
	})
  })
}



module.exports = { query }