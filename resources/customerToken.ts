import { UnitResponse } from "../types/common"
import { CreateTokenRequest, CustomerToken, CreateTokenVerificationRequest, VerificationToken } from "../types/customerToken"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class CustomerTokens extends BaseResource {
    constructor(token: string, basePath: string, axios?: AxiosInstance){
        super(token,basePath + "/customers", axios)
    }

    public async createToken(customerId: string, request: CreateTokenRequest) : Promise<UnitResponse<CustomerToken>> {
        return this.httpPost<UnitResponse<CustomerToken>>(`/${customerId}/token`, { data: request })
    }

    public async createTokenVerification(customerId: string, request: CreateTokenVerificationRequest) : Promise<UnitResponse<VerificationToken>> {
        return this.httpPost<UnitResponse<VerificationToken>>(`/${customerId}/token/verification`,{ data: request})
    }
}

