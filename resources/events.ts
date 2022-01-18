import { UnitConfig, UnitResponse } from "../types/common"
import { UnitEvent } from "../types/events"
import { BaseResource } from "./baseResource"

export class Events extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/events", config)
    }

    public async get(id: string): Promise<UnitResponse<UnitEvent>> {
        return await this.httpGet<UnitResponse<UnitEvent>>(`/${id}`)
    }

    public async list(params?: EventListParams): Promise<UnitResponse<UnitEvent[]>> {
        const parameters: Record<string, unknown> = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0)
        }

        if(params?.filter?.type){
            parameters["filter[type]"] = params.filter.type
        }

        return this.httpGet<UnitResponse<UnitEvent[]>>("", { params: parameters })
    }

    public async fire(id: string): Promise<UnitResponse<UnitEvent>> {
        return await this.httpPost<UnitResponse<UnitEvent>>(`/${id}`)
    }
}

export interface EventListParams {
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

    filter?: {
        /**
         * Optional. Filter Events by Event type.
         */
        type?: string[]
    }
}
