const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

// 执行sql语句
function execSQL(sql) {
	const promise = new Promise((resolve, reject) => {
		connection.query(sql, (err, result) => {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
	return promise;
}

// 关闭连接
// connection.end();

module.exports = {
	execSQL,
};
