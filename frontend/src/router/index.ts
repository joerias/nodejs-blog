import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import route from "@/utils/route";

const router = createRouter({
	history: createWebHistory(),
	routes: <Array<RouteRecordRaw>>route(),
});

export default router;
