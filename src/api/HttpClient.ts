/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance, AxiosResponse } from "axios";

export abstract class HttpClient {
    protected readonly _axiosInstance: AxiosInstance;

    constructor(baseUrl: string, headers?: object) {
        console.log(baseUrl);
        this._axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: { ...headers },
        });

        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this._axiosInstance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    };

    private handleResponse = (response: AxiosResponse) => response;

    protected handleError = (error: any): Promise<any> => Promise.reject(error);
}
