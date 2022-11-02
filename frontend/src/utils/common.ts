// 获取url的参数
const getUrlQuery = (key: string, url?: string) => {
	if (!url) {
		url = window.location.href;
	}
	key = key.replace(/[\[\]]/g, "\\$&");
	const regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)");
	const result = regex.exec(url);
	if (!result) return null;
	if (!result[2]) return "";
	return decodeURIComponent(result[2].replace(/\+/g, " "));
};

export default {
	getUrlQuery,
};
