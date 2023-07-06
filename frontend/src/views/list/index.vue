<script setup lang="ts">
defineOptions({
	name: "list",
});

import { ref } from "vue";
import NavBar from "@/components/nav-bar/index.vue";
import router from "@/router";
import { IItemData } from "@/types";
import { showSuccessToast } from "vant";
import { list, del } from "@/config/api";

const listData = ref<IItemData[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const onLoad = () => {
	getList();
};

const getList = async () => {
	loading.value = true;
	try {
		const { data } = await list();
		listData.value = data;
	} finally {
		loading.value = true;
		finished.value = true;
	}
};

const handleLink = (id: number) => {
	router.push(`/detail?id=${id}`);
};

const handleCreate = () => {
	router.push("/detail");
};

const handleDel = async (obj: IItemData) => {
	try {
		const { message } = await del(obj.id);
		showSuccessToast(message);
		getList();
	} finally {
	}
};
</script>

<template>
	<nav-bar title="List">
		<template #right>
			<van-icon name="plus" @click="handleCreate" />
		</template>
	</nav-bar>

	<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<van-cell v-for="(o, i) in listData" :key="i" @click="handleLink(o.id)">
			<van-swipe-cell>
				<div class="con">
					<div class="hd">
						<div class="tit">
							{{ o.title }}
						</div>
						<div class="date">
							{{ o.date }}
						</div>
					</div>
					<div class="summary">
						{{ o.content }}
					</div>
				</div>
				<template #right>
					<van-button class="btn-del" square type="danger" text="删除" @click="handleDel(o)" />
				</template>
			</van-swipe-cell>
		</van-cell>
	</van-list>
</template>

<style lang="less" scoped>
.van-cell {
	padding: 0;
}
.con {
	padding: 30px 30px 20px;
}
.hd {
	display: flex;
	justify-content: space-between;
	line-height: 60px;
	font-size: 32px;
}
.tit {
	color: #666;
	flex: 0 0 70%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.date {
	font-size: 30px;
	flex: 0 0 30%;
	color: #ccc;
	text-align: right;
}
.summary {
	line-height: 40px;
	max-height: 80px;
	overflow: hidden;
	margin: 15px 0 0;
	color: #aaa;
}
.btn-del {
	height: 100%;
}
</style>
