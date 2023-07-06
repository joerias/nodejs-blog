<script setup lang="ts">
import { onBeforeMount, reactive, getCurrentInstance } from "vue";
import NavBar from "@/components/nav-bar/index.vue";
import router from "@/router";
import { detail, update, add } from "@/config/api";
import { IItemData, IAddParams } from "@/types";
import { showToast } from "vant";

const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;

const id: string | null = globalProperties?.$common.getUrlQuery("id");
const editStatus: number = id ? 1 : 0;
const t = new Date();
const ty = t.getFullYear();
const tm = t.getMonth() + 1 < 10 ? `0${t.getMonth() + 1}` : t.getMonth() + 1;
const td = t.getDate() < 10 ? `0${t.getDate()}` : t.getDate();
const detailData = reactive<IItemData>({
	id: 0,
	title: "标题",
	author: "joe",
	content: "在生产中部署泛型代码时请谨慎",
	createdAt: t.getTime(),
	date: `${ty}-${tm}-${td}`,
	state: 1,
});

onBeforeMount(() => {
	if (id) getDetail(id);
});

const getDetail = async (id: string) => {
	try {
		const {
			data: { title, content, author, date },
		} = await detail(id);
		detailData.title = title;
		detailData.author = author;
		detailData.content = content;
		detailData.date = date;
	} finally {
	}
};

const onSubmit = (values: IAddParams) => {
	post(values);
};

const post = async (obj: IAddParams) => {
	if (id) {
		try {
			const { message } = await update(id, obj);
			showToast(message);
			router.push("/list");
		} finally {
		}
	} else {
		try {
			await add(obj);
			showToast("创建成功");
			router.push("/list");
		} finally {
		}
	}
};
</script>

<template>
	<NavBar title="Detail" />
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="detailData.title"
				name="title"
				label="标题"
				placeholder="请填写标题"
				:rules="[{ required: true, message: '请填写标题' }]"
			/>
			<van-field name="author" label="用户">
				<template #input>
					<van-radio-group v-model="detailData.author" direction="horizontal">
						<van-radio name="joe">joe</van-radio>
						<van-radio name="jim">jim</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field
				v-model="detailData.content"
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
			<van-field name="date" disabled v-model="detailData.date" label="日期" />
			<van-field name="createdAt" v-model="detailData.createdAt" style="display: none" />
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit">
				{{ editStatus ? "修改" : "保存" }}
			</van-button>
		</div>
	</van-form>
</template>

<style lang="less" scoped></style>
