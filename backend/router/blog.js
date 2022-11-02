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

router.post("/new", (req, res) => {
	console.log(req.body);
	// return createBlog(req.query).then((data) => {
	// 	if (data) {
	// 		res.send(new SuccessModel(data));
	// 	}
	// });
});

module.exports = router;
