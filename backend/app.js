const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.use(function (res, req, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "content-type");
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method === "OPTIONS") res.sendStatus(200);
	else next();
});

app.use("/api/blog", require("./router/blog"));

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
