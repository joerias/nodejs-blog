import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { showToast } from "vant";

const service: AxiosInstance = axios.create({
	timeout: 5000,
});

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		Promise.reject(error);
	}
);

service.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		const { response } = error;
		if (response?.status !== 200) showToast({ message: <string>response?.statusText, position: "bottom" });
		Promise.reject(error);
	}
);

export const req = <T>(method: "get" | "post", url: string, params?: any, timeout?: number) => {
	return new Promise<IRes<T>>((resolve, reject) => {
		service({
			method,
			url,
			data: params,
			timeout,
		})
			.then((res) => {
				const { data } = res;
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

interface IRes<T> {
	code: number;
	data: T;
	message: string;
}
