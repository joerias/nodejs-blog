import { req } from "@/utils/request";
import { IItemData, IAddParams } from "@/types";

export const list = () => req<IItemData[]>("get", `/api/api/blog/list`);
export const detail = (id: string) => req<IItemData>("get", `/api/api/blog/detail?id=${id}`);
export const update = (id: string, params: IAddParams) => req("post", `/api/api/blog/update?id=${id}`, params);
export const add = (params: IAddParams) => req("post", `/api/api/blog/add`, params);
export const del = (id: number) => req("post", `/api/api/blog/delete?id=${id}`);
