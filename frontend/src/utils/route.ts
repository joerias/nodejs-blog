import data from "@/config/routes";

export default () => {
	const list = data.list.map((v) => {
		let rst = {};
		if (!v.hide) {
			rst = {
				path: v.path,
				name: v.path,
				meta: {
					title: v.name,
				},
				component: v.file,
			};
		}
		return rst;
	});

	for (let i = 0; i < list.length; i++) {
		if (list[i] === null || list[i] === "" || JSON.stringify(list[i]) === "{}") {
			list.splice(i, 1);
			i -= 1;
		}
	}

	return [
		{
			path: "/",
			redirect: data.list[0].path,
			children: list,
		},
	];
};
