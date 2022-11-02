<script setup lang="ts">
type Props = {
	title: string;
};
const props = defineProps<Props>();

const onClickLeft = () => {
	window.history.back();
};
</script>

<template>
	<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
		<template #right><slot name="right"></slot> </template>
	</van-nav-bar>
</template>

<style lang="less" scoped>
.van-nav-bar {
	line-height: 80px;
}
:deep(.van-nav-bar__content) {
	height: 80px;
}
:deep(.van-nav-bar__left),
:deep(.van-nav-bar__right),
:deep(.van-nav-bar__title) {
	font-size: 26px;
}
:deep(.van-icon) {
	font-size: 30px;
}
</style>
