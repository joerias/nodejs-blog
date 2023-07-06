<script setup lang="ts">
defineOptions({
	name: "nav-bar",
});

type Props = {
	title: string;
};
const props = withDefaults(defineProps<Props>(), {});

const onClickLeft = () => {
	window.history.back();
};
</script>

<template>
	<van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
		<template #right><slot name="right"></slot> </template>
	</van-nav-bar>
</template>

<style lang="less" scoped>
.van-nav-bar {
	line-height: @nav-bar-height;
}
:deep(.van-nav-bar__content) {
	height: @nav-bar-height;
}
:deep(.van-nav-bar__left),
:deep(.van-nav-bar__right),
:deep(.van-nav-bar__title) {
	font-size: @nav-bar-txt-size;
}
:deep(.van-icon) {
	font-size: @nav-bar-ico-size;
	margin: 0 10px;
}
</style>
