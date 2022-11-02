const { execSQL } = require("../db");

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `;
	if (author) sql += `and author='${author}' `;
	if (keyword) keyword += `and title like '%${keyword}%'`;
	return execSQL(sql);
};

const getDetail = (id) => {
	let sql = `select * from blogs where id='${id}'`;
	return execSQL(sql).then((rows) => {
		return rows[0];
	});
};

const createBlog = (blogData = {}) => {
	const { title, content, author } = blogData;
	const createdAt = Date.now();
	const sql = `insert into blogs (title, content, author, createdAt) values ('${title}', '${content}', '${author}', '${createdAt}')`;
	return execSQL(sql).then((insertedResult) => {
		return {
			id: insertedResult.insertId,
		};
	});
};

const updateBlog = (id, blogData = {}) => {
	const { title, content } = blogData;
	const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
	return execSQL(sql).then((updateResult) => {
		if (updateResult.affectedRows > 0) {
			return true;
		}
		return false;
	});
};

const deleteBlog = (id, author) => {
	const sql = `delete from blogs where id=${id} and author='${author}'`;
	return execSQL(sql).then((deleteResult) => {
		if (deleteResult.affectedRows > 0) {
			return true;
		}
		return false;
	});
};

module.exports = { getList, getDetail, createBlog, updateBlog, deleteBlog };