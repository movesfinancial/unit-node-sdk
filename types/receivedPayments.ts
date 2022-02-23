import {Relationship} from "./common"

export type ReceivedPaymentStatus = "Pending" | "Advanced" | "Completed" | "Returned"

export interface AchReceivedPayment {
    type: "achReceivedPayment"
    id: string
    attributes: {
        createdAt:string
        status: ReceivedPaymentStatus
        wasAdvanced: boolean
        completionDate: string
        returnReason: string
        amount: number
        description: string
        addenda?: string
        companyName: string
        counterpartyRoutingNumber: string
        traceNumber: string
        secCode?: string
        tags?: Record<string, unknown>
    }
    relationships:{
        account: Relationship
        customer: Relationship
        receivedPaymentTransaction: Relationship
        repayPaymentAdvanceTransaction: Relationship
    }
}

export interface PatchAchReceivedPaymentRequest {
    type: "achReceivedPayment"
    attributes: {
        tags: object
    }
}