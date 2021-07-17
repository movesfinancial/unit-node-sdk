import { UnitResponse } from "../types/common"
import { Customer, PatchCustomerRequest } from "../types/customer"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class Customers extends BaseResource {

    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/customers", axios)
    }

    public async update(request: PatchCustomerRequest): Promise<UnitResponse<Customer>>{
        return this.httpPatch<UnitResponse<Customer>>(`/${request.customerId}`, { data: request.data })
    }

    public async get(customerId: string): Promise<UnitResponse<Customer>> {
        return this.httpGet<UnitResponse<Customer>>(`/${customerId}`)
    }

    public async list(params?: CustomersListParams): Promise<UnitResponse<Customer[]>> {

        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.query && { "filter[query]": params.query }),
            ...(params?.email && { "filter[email]": params.email }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            "sort": params?.sort ? params.sort : "-createdAt"
        }

        return this.httpGet<UnitResponse<Customer[]>>("", { params: parameters })
    }
}

interface CustomersListParams {
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

    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string

    /**
     * Optional. Filter customers by email address (case sensitive).
     * default: empty
     */
    email?: string

    /**
     * Optional. Filter customers by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string
}
