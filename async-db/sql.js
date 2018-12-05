/**
 * Created by Administrator on 2018/11/16 0016.
 * SQL语句
 */
const {query}=require('./query')
//数据库设计
//用户表(users)：id、name、pass

//let users = `create table if not exists users(
// id INT NOT NULL AUTO_INCREMENT,
// name VARCHAR(100) NOT NULL,
// pass VARCHAR(40) NOT NULL,
// PRIMARY KEY ( id )
//
//);`;
////文章表(posts)：id、name、title、content、uic、moment、comments、pv
//
//let posts = `create table if not exists posts(
// id INT NOT NULL AUTO_INCREMENT,
// name VARCHAR(100) NOT NULL,
// title VARCHAR(40) NOT NULL,
// content  VARCHAR(40) NOT NULL,
// uid  VARCHAR(40) NOT NULL,
// moment  VARCHAR(40) NOT NULL,
// comments  VARCHAR(40) NOT NULL DEFAULT '0',
// pv  VARCHAR(40) NOT NULL DEFAULT '0',
// PRIMARY KEY ( id )
//);`;
////评论表(comment)：id、name、content、postid
//let comment = `create table if not exists comment(
// id INT NOT NULL AUTO_INCREMENT,
// name VARCHAR(100) NOT NULL,
// content VARCHAR(40) NOT NULL,
// postid VARCHAR(40) NOT NULL,
// PRIMARY KEY ( id )
//);`;
//
//let createTable = function(sql) {
//  return query(sql, []);
//};
//createTable(users);
//createTable(posts);
//createTable(comment);

// 查找用户
let findUserData = function( name ) {
  let _sql = `select * from users where name="${name}";`
  return query( _sql)
}

//
module.exports = {findUserData }
