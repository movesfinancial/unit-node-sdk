import axiosStatic, { AxiosInstance } from "axios"
import { UnitError } from "../types/common"

export class BaseResource {
    private resourcePath: string
    private headers: {}
    private readonly axios: AxiosInstance

    constructor(token: string, resourcePath: string, axios?: AxiosInstance) {
        this.resourcePath = resourcePath

        this.headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json"
        }

        this.axios = axios ?? axiosStatic
    }

    protected async httpGet<T>(path: string, config?: { headers?: object; params?: object; }) : Promise<T> {

        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params)})
        }

        return await this.axios.get<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw new UnitError(error.response.data) })
    }

    protected async httpPatch<T>(path: string, data: object, config?: { headers?: object; params?: object; }) : Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.patch<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw new UnitError(error.response.data) })
    }

    protected async httpPost<T>(path: string, data?: object, config?: { headers?: object; params?: object; }) : Promise<T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.post<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw new UnitError(error.response.data) })
    }

    protected async httpPut<T>(path: string, data: object, config?: { headers?: object; params?: object; }) : Promise<T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.put<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw new UnitError(error.response.data) })
    }

    protected async httpDelete<T>(path: string) : Promise<T> {
        return await this.axios.delete<T>(this.resourcePath + path, {headers: this.headers})
            .then(r => r.data)
            .catch(error => { throw new UnitError(error.response.data) })
    }

    private mergeHeaders(configHeaders: object | undefined){
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}