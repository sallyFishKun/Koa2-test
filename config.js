/**
 * Created by Administrator on 2018/11/16 0016.
 */
const config = {
  port: 3000,
  mysql_config: {
	host: 'localhost',   // 数据库地址
	port:'3306',
	user: 'root',    // 数据库用户
	password: '123456',   // 数据库密码
	database: 'koa2-test'  // 选中数据库名称
  },
  secret:'my_token',//token 校验密码
};
//host: config.database.HOST,
//	port: config.database.PORT,
//	user: config.database.USERNAME,
//	password: config.database.PASSWORD,
//	database: config.database.DATABASE

//DATABASE: 'koablog',
//	USERNAME: 'root',
//	PASSWORD: '123456',
//	PORT: '3306',
//	HOST: 'localhost'
module.exports = config;