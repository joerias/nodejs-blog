<script setup lang="ts">
import { onBeforeMount, ref, getCurrentInstance } from "vue";
import NavBar from "@/components/nav-bar/index.vue";

const globalProperties = getCurrentInstance()?.appContext.config.globalProperties;

const id: string | null = globalProperties?.$common.getUrlQuery("id");
const status: number = id ? 1 : 0;
const username = ref("");
const password = ref("");
const checked = ref("");

onBeforeMount(() => {});
const onSubmit = (values: any) => {
	console.log("submit", values);
};
</script>

<template>
	<NavBar title="Blog" />
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field
				v-model="username"
				name="标题"
				label="标题"
				placeholder="请填写标题"
				:rules="[{ required: true, message: '请填写标题' }]"
				:disabled="!status"
			/>
			<van-field name="radio" label="用户" :disabled="!status">
				<template #input>
					<van-radio-group v-model="checked" direction="horizontal" :disabled="!status">
						<van-radio name="1">单选框 1</van-radio>
						<van-radio name="2">单选框 2</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field
				v-model="password"
				type="textarea"
				autosize
				rows="5"
				show-word-limit
				maxlength="50"
				name="内容"
				label="内容"
				placeholder="请填写内容"
				:rules="[{ required: true, message: '请填写内容' }]"
				:disabled="!status"
			/>
		</van-cell-group>
		<div v-if="status" style="margin: 16px">
			<van-button round block type="primary" native-type="submit"> 提交 </van-button>
		</div>
	</van-form>
</template>

<style lang="less" scoped>
@import "@/assets/less/variable.less";
</style>
