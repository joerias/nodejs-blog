export default <{ list: Type[] }>{
	list: [
		{
			name: "博客列表页",
			path: "list",
			file: () => import("@/views/list/index.vue"),
		},
		{
			name: "博客详情页",
			path: "detail",
			file: () => import("@/views/detail/index.vue"),
		},
	],
};

interface Type {
	name: string;
	path: string;
	file: Function;
	hide?: boolean;
}
