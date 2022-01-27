import { Relationship } from "./common"

export type UnitEvent =
    AccountClosed |
    ApplicationDenied |
    ApplicationAwaitingDocuments |
    AuthorizationAmountChanged |
    AuthorizationCanceled |
    AuthorizationCreated |
    AuthorizationDeclined |
    CardActivated |
    CardStatusChanged |
    CustomerCreated |
    DocumentApproved |
    DocumentRejected |
    PaymentClearing |
    PaymentReturned |
    PaymentSent |
    StatementsCreated |
    TransactionCreated;

export interface BaseEvent {
    id: string
    type: string
    attributes: BaseEventAttributes
    relationships?: BaseEventRelationships
}

export interface BaseEventAttributes {
    createdAt: string
    tags?: Record<string, any>
    [k: string]: unknown // support attributes not added-yet to this schema definition
}

export interface BaseEventRelationships {
    [k: string]: Relationship
}

export type AccountClosed = BaseEvent & {
    type: "account.closed"
    attributes: {
        closeReason: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type ApplicationDenied = BaseEvent & {
    type: "application.denied"
    relationships: {
        application: Relationship

    }
}

export type ApplicationAwaitingDocuments = BaseEvent & {
    type: "application.awaitingDocuments"
    relationships: {
        application: Relationship
    }
}

export type AuthorizationAmountChanged = BaseEvent & {
    type: "authorization.amountChanged"
    attributes: {
        cardLast4Digits: string
        recurring: boolean
        oldAmount: number
        newAmount: number
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}


export type AuthorizationCanceled = BaseEvent & {
    type: "authorization.canceled"
    attributes: {
        amount: number
        cardLast4Digits: string
        recurring: boolean
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type AuthorizationCreated = BaseEvent & {
    type: "authorization.created"
    attributes: {
        cardLast4Digits: string
        recurring: boolean
        amount: number
        merchant: {
            name: string
            type: string
        }
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type AuthorizationDeclined = BaseEvent & {
    type: "authorization.declined"
    attributes: {
        amount: number
        cardLast4Digits: string
        recurring: boolean
        reason: string
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardActivated = BaseEvent & {
    type: "card.activated"
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardStatusChanged = BaseEvent & {
    type: "card.statusChanged"
    attributes: {
        newStatus: string
        previousStatus: string
    }
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CustomerCreated = BaseEvent & {
    type: "customer.created"
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export type DocumentApproved = BaseEvent & {
    type: "document.approved"
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export type DocumentRejected = BaseEvent & {
    type: "document.rejected"
    attributes: {
        reason: string
        reasonCode: string
    }
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export type PaymentClearing = BaseEvent & {
    type: "payment.clearing"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type PaymentSent = BaseEvent & {
    type: "payment.sent"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type PaymentReturned = BaseEvent & {
    type: "payment.returned"
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type StatementsCreated = BaseEvent & {
    type: "statements.created"
}

export type TransactionCreated = BaseEvent & {
    type: "transaction.created"
    attributes: {
        summary: string
        direction: "Credit" | "Debit"
        amount: string
    }
    relationships: {
        transaction: Relationship
        account: Relationship
        customer: Relationship
        payment: Relationship
    }
}

