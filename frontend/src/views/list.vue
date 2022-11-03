<script setup lang="ts">
import { ref } from "vue";
import NavBar from "@/components/nav-bar/index.vue";
import router from "@/router";
import axios from "axios";
import { IListData } from "@/types";
import { showSuccessToast, showFailToast } from "vant";

const list = ref<IListData[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const onLoad = () => {
	getList();
	// 加载状态结束
	loading.value = false;
	// 数据全部加载完成
	finished.value = true;
};

const getList = async () => {
	await axios.get("/api/api/blog/list").then((res) => {
		const {
			data: { code, data },
		} = res;
		if (code === 200) {
			list.value = data;
		}
	});
};

const handleLink = (id: number) => {
	router.push(`/detail?id=${id}`);
};

const handleCreate = () => {
	router.push("/detail");
};

const handleDel = async (obj: IListData) => {
	await axios.post(`/api/api/blog/delete?id=${obj.id}&author=${obj.author}`).then((res) => {
		const {
			data: { code, message },
		} = res;
		if (code === 200) {
			showSuccessToast(message);
			getList();
		} else {
			showFailToast(message);
		}
	});
};
</script>

<template>
	<NavBar title="Blog">
		<template #right>
			<van-icon name="plus" @click="handleCreate" />
		</template>
	</NavBar>
	<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<van-cell v-for="(o, i) in list" :key="i" @click="handleLink(o.id)">
			<van-swipe-cell>
				<van-cell>
					<div class="hd">
						<div class="tit">
							{{ o.title }}
						</div>
						<div class="date">
							{{ o.date }}
						</div>
					</div>
					<div class="cont">
						{{ o.content }}
					</div>
				</van-cell>
				<template #right>
					<van-button square type="danger" text="删除" @click="handleDel(o)" />
				</template>
			</van-swipe-cell>
		</van-cell>
	</van-list>
</template>

<style lang="less" scoped>
@import "@/assets/less/variable.less";
.hd {
	display: flex;
	justify-content: space-between;
	line-height: 60px;
	font-size: 32px;
}
.tit {
	color: #666;
	flex: 0 0 80%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.date {
	font-size: 26px;
	flex: 0 0 20%;
	color: #ccc;
}
.cont {
	line-height: 40px;
	max-height: 80px;
	overflow: hidden;
	margin: 10px 0;
	color: #aaa;
}
</style>
