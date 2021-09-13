import { ApplicationDocumentStatus } from "./application"
import { Relationship } from "./common"

export type UnitEvent = AccountClosed | ApplicationDenied | ApplicationDocumentStatus | ApplicationAwaitingDocuments | AuthorizationCreated | CardActivated | CardStatusChanged | CustomerCreated |
    DocumentApproved | DocumentRejected | PaymentClearing | PaymentReturned | PaymentSent | StatementsCreated | TransactionCreated

export interface AccountClosed {
    id: string
    type: "account.closed"
    attributes: {
        createdAt: string
        closeReason: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export interface ApplicationDenied {
    id: string
    type: "authorization.created"
    attributes: {
        createdAt: string
    }
    relationships: {
        application: Relationship

    }
}

export interface ApplicationAwaitingDocuments {
    id: string
    type: "application.awaitingDocuments"
    attributes: {
        createdAt: string
    }
    relationships: {
        application: Relationship
    }
}

export interface AuthorizationCreated {
    id: string
    type: "authorization.created"
    attributes: {
        createdAt: string
        cardLast4Digits: string
        recurring: boolean
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface CardActivated {
    id: string
    type: "card.activated"
    attributes: {
        createdAt: string
    }
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface CardStatusChanged {
    id: string
    type: "card.statusChanged"
    attributes: {
        createdAt: string
        newStatus: string
        previousStatus: string
    }
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface CustomerCreated {
    id: string
    type: "customer.created"
    attributes: {
        createdAt: string
    }
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export interface DocumentApproved {
    id: string
    type: "document.approved"
    attributes: {
        createdAt: string
    }
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export interface DocumentRejected {
    id: string
    type: "document.rejected"
    attributes: {
        createdAt: string
        reason: string
        reasonCode: string
    }
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export interface PaymentClearing {
    id: string
    type: "payment.clearing"
    attributes: {
        createdAt: string
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface PaymentSent {
    id: string
    type: "payment.sent"
    attributes: {
        createdAt: string
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface PaymentReturned {
    id: string
    type: "payment.returned"
    attributes: {
        createdAt: string
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

export interface StatementsCreated {
    id: string
    type: "statements.created"
    attributes: {
        createdAt: string
    }
}

export interface TransactionCreated {
    id: string
    type: "transaction.created"
    attributes: {
        createdAt: string
        summary: string
        direction: string
        amount: string
    }
    relationships: {
        transaction: Relationship
        account: Relationship
        customer: Relationship
        payment: Relationship
    }
}

