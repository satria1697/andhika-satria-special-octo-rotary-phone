import axios, {AxiosRequestConfig} from "axios";
import {Response} from "../entities/Common";

export const invoke = async <T = any>(url: string, params?: Record<string, any>) => {
    const config: AxiosRequestConfig = {
        baseURL: 'https://devgopwsearch.pasarwarga.com/',
        method: "GET",
        url,
        params
    }
    return await axios.request<Response<T>>(config)
}
