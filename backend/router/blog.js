const express = require("express");
const { SuccessModel, ErrorModel } = require("../model/responseModel");
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require("../controllers/blog");

const router = express.Router();

router.get("/list", (req, res) => {
	const author = req.query.author || "";
	const keyword = req.query.keyword || "";
	return getList(author, keyword).then((data) => {
		res.send(new SuccessModel(data));
	});
});

router.get("/detail", (req, res) => {
	return getDetail(req.query.id).then((data) => {
		if (data) {
			res.send(new SuccessModel(data));
		} else {
			res.send(new ErrorModel("id不存在"));
		}
	});
});

router.post("/add", (req, res) => {
	return createBlog(req.body).then((data) => {
		if (data) {
			res.send(new SuccessModel(data));
		}
	});
});

router.post("/update", (req, res) => {
	return updateBlog(req.query.id, req.body).then((data) => {
		if (data) {
			res.send(new SuccessModel("更新博客成功"));
		} else {
			res.send(new ErrorModel("更新博客失败"));
		}
	});
});

router.post("/delete", (req, res) => {
	return deleteBlog(req.query.id).then((data) => {
		if (data) {
			res.send(new SuccessModel("删除博客成功"));
		} else {
			res.send(new ErrorModel("删除博客失败"));
		}
	});
});

module.exports = router;
