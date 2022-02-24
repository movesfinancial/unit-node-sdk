import { Account } from "../types/account"
import {Include, Meta, UnitConfig, UnitResponse} from "../types/common"
import { Customer } from "../types/customer"
import { Transaction } from "../types/transactions"
import { BaseResource } from "./baseResource"
import {AchReceivedPayment, PatchAchReceivedPaymentRequest, ReceivedPaymentStatus} from "../types/receivedPayments"

export class ReceivedPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/received-payments", config)
    }

    public async update(id: string, request: PatchAchReceivedPaymentRequest) : Promise<UnitResponse<AchReceivedPayment>> {
        return this.httpPatch<UnitResponse<AchReceivedPayment>>(`/${id}`, {data: request})
    }

    /**
     * Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account, transaction. See Getting Related Resources
     */
    public async get(id: string, include?: string) : Promise<UnitResponse<AchReceivedPayment> & Include<Account[] | Customer[] | Transaction[]>> {
        const params = { include : include ? `include=${include}` : "" }
        return this.httpGet<UnitResponse<AchReceivedPayment> & Include<Account[] | Customer[] | Transaction[]>>(`/${id}`,{params})
    }

    public async list(params?: ReceivedPaymentListParams) : Promise<UnitResponse<AchReceivedPayment[]> & Include<Account[] | Customer[] | Transaction[]> & Meta> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            "sort": params?.sort ? params.sort : "-createdAt",
            "include": params?.include ? params.include : "",
            ...(params?.includedCompleted && { "filter[includedCompleted]": params.includedCompleted}),
            ...(params?.status && { "filter[status]": params.status})
        }

        return this.httpGet<UnitResponse<AchReceivedPayment[]> & Include<Account[] | Customer[] | Transaction[]>  & Meta>("", {params: parameters})
    }
}

export interface ReceivedPaymentListParams {
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
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. Filter Received Payments by ReceivedPayment Status. Usage example: filter[status][0]=Pending&filter[status][1]=Advanced. cant be stated with includeCompleted.
     */
    status?: ReceivedPaymentStatus[]

    /**
     * Optional. Filter to include ReceivedPayment with Status 'Completed', default False. cant be stated with filter[status[]
     */
    includedCompleted?: boolean

    /**
     * Optional. .Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string

    /**
     * Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     */
    include?: string
}
