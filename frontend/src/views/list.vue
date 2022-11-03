<script setup lang="ts">
import { ref } from "vue";
import NavBar from "@/components/nav-bar/index.vue";
import router from "@/router";
const list = ref<any[]>([
	{
		id: 1,
		title: "title",
		author: "joe",
		content: "infomation",
		date: "2022-01-01",
	},
	{
		id: 1,
		title: "在简中互联网你能找到100篇科普文章解释IC卡的电磁学原理",
		author: "joe",
		content:
			"加了密大不了就是没法自己充值呗，为啥连复制也不行，我复制不需要破解出明文啊，我把密文照抄一边都不行？因为读卡器读卡属于IO，读的是IC卡这台计算机的输出，而不是直接读IC卡里存储器的内容，正如你家路由器也不能直接读出你家电脑硬盘里的内容。",
		date: "2022-01-01",
	},
]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
const onLoad = () => {
	return fetch("localhost:8080/api/blog/list", { method: "GET" })
		.then((res) => {
			console.log(res.json());
		})
		.catch((err) => {
			console.log(err);
		});
	// setTimeout(() => {
	// 	for (let i = 0; i < 10; i++) {
	// 		list.value.push(list.value.length + 1);
	// 	}
	// 	// 加载状态结束
	// 	loading.value = false;
	// 	// 数据全部加载完成
	// 	if (list.value.length >= 40) {
	// 		finished.value = true;
	// 	}
	// }, 1000);
};
// const postData = (url, method, data)=>{
// 	return fetch
// }

const handleLink = (id: number) => {
	router.push(`/detail?id=${id}`);
};
const handleCreate = () => {
	router.push("/detail");
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
