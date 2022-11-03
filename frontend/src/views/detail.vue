<script setup lang="ts">
import { onBeforeMount, ref, getCurrentInstance } from "vue";
import NavBar from "@/components/nav-bar/index.vue";
import router from "@/router";
import axios from "axios";
import { IAdd } from "@/types";
import { showSuccessToast, showFailToast } from "vant";

const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;

const id: string | null = globalProperties?.$common.getUrlQuery("id");
const editStatus: number = id ? 1 : 0;
const tit = ref<string>("标题");
const cont = ref<string>(
	"Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。 它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。"
);
const auth = ref<string>("joe");
const date = ref<string>("");

onBeforeMount(() => {
	if (id) getDetail(id);
});

const getDetail = async (id: string) => {
	await axios.get(`/api/api/blog/detail?id=${id}`).then((res) => {
		const {
			data: {
				code,
				data: { title, content, author, createdAt },
			},
		} = res;
		if (code === 200) {
			tit.value = title;
			cont.value = content;
			auth.value = author;
			const time = new Date(createdAt);
			const y = time.getFullYear();
			const m = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
			const d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
			date.value = `${y}-${m}-${d}`;
		}
	});
};

const onSubmit = (values: IAdd) => {
	post(values);
};

const post = async (obj: IAdd) => {
	if (id) {
		await axios.post(`/api/api/blog/update?id=${id}`, obj).then((res) => {
			const {
				data: { code, message },
			} = res;
			if (code === 200) {
				showSuccessToast(message);
				router.push("/list");
			} else {
				showFailToast(message);
			}
		});
	} else {
		await axios.post("/api/api/blog/add", obj).then((res) => {
			const {
				data: { code },
			} = res;
			if (code === 200) {
				showSuccessToast("创建成功");
				router.push("/list");
			}
		});
	}
};
</script>

<template>
	<NavBar title="Blog" />
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="tit"
				name="title"
				label="标题"
				placeholder="请填写标题"
				:rules="[{ required: true, message: '请填写标题' }]"
			/>
			<van-field name="author" label="用户">
				<template #input>
					<van-radio-group v-model="auth" direction="horizontal">
						<van-radio name="joe">joe</van-radio>
						<van-radio name="jim">jim</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field
				v-model="cont"
				type="textarea"
				autosize
				rows="5"
				show-word-limit
				maxlength="50"
				name="content"
				label="内容"
				placeholder="请填写内容"
				:rules="[{ required: true, message: '请填写内容' }]"
			/>
			<van-field v-if="editStatus" disabled v-model="date" label="日期" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit">
				{{ editStatus ? "修改" : "保存" }}
			</van-button>
		</div>
	</van-form>
</template>

<style lang="less" scoped>
@import "@/assets/less/variable.less";
</style>
