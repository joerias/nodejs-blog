import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/list",
		children: [
			{
				path: "list",
				name: "List",
				meta: {
					title: "博客列表页",
				},
				component: () => import("@/views/list.vue"),
			},
			{
				path: "detail",
				name: "Detail",
				meta: {
					title: "博客详情页",
				},
				component: () => import("@/views/detail.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
