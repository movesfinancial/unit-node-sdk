import { UnitResponse } from "../types/common"
import { CreateWebhookRequest, PatchWebhookRequest, Webhook } from "../types/webhooks"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class Webhooks extends BaseResource {
    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/webhooks", axios)
    }

    public async create(request: CreateWebhookRequest): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>("", { data: request })
    }

    public async get(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpGet<UnitResponse<Webhook>>(`/${id}`)
    }

    public async list(params?: WebhookListParams): Promise<UnitResponse<Webhook[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0)
        }

        return this.httpGet<UnitResponse<Webhook[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchWebhookRequest): Promise<UnitResponse<Webhook>> {
        return this.httpPatch<UnitResponse<Webhook>>(`/${id}`, { data: request })
    }

    public async enable(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>(`/${id}/enable`)
    }

    public async disable(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>(`/${id}/disable`)
    }
}

export interface WebhookListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number
}