import { ApplicationDocumentStatus } from "./application"
import { Relationship } from "./common"

export type UnitEvent =
    AccountClosed |
    ApplicationDenied |
    ApplicationDocumentStatus |
    ApplicationAwaitingDocuments |
    AuthorizationCreated |
    CardActivated |
    CardStatusChanged |
    CustomerCreated |
    DocumentApproved |
    DocumentRejected |
    PaymentClearing |
    PaymentReturned |
    PaymentSent |
    StatementsCreated |
    TransactionCreated

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

// use const assertions to declare hierarchical constants
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
export const EventType = {
    account: {
        closed: "account.closed"
    },
    application: {
        denied: "application.denied",
        awaitingDocuments: "application.awaitingDocuments"
    },
    authorization: {
        created: "authorization.created"
    },
    card: {
        activated: "card.activated",
        statusChanged: "card.statusChanged"
    },
    customer: {
        created: "customer.created"
    },
    document: {
        approved: "document.approved",
        rejected: "document.rejected"
    },
    payment: {
        clearing: "payment.clearing",
        sent: "payment.sent",
        returned: "payment.returned"
    },
    statements: {
        created: "statements.created"
    },
    transaction: {
        created: "transaction.created"
    }
} as const

export type AccountClosed = BaseEvent & {
    type: typeof EventType.account.closed
    attributes: {
        closeReason: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export type ApplicationDenied = BaseEvent & {
    type: typeof EventType.application.denied
    relationships: {
        application: Relationship
    }
}

export type ApplicationAwaitingDocuments = BaseEvent & {
    type: typeof EventType.application.awaitingDocuments
    relationships: {
        application: Relationship
    }
}

export type AuthorizationCreated = BaseEvent & {
    type: typeof EventType.authorization.created
    attributes: {
        cardLast4Digits: string
        recurring: boolean
    }
    relationships: {
        authorization: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardActivated = BaseEvent & {
    type: typeof EventType.card.activated
    relationships: {
        card: Relationship
        account: Relationship
        customer: Relationship
    }
}

export type CardStatusChanged = BaseEvent & {
    type: typeof EventType.card.statusChanged
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
    type: typeof EventType.customer.created
    relationships: {
        customer: Relationship
        application: Relationship
    }
}

export type DocumentApproved = BaseEvent & {
    type: typeof EventType.document.approved
    relationships: {
        document: Relationship
        application: Relationship
    }
}

export type DocumentRejected = BaseEvent & {
    type: typeof EventType.document.rejected
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
    type: typeof EventType.payment.clearing
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
    type: typeof EventType.payment.sent
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
    type: typeof EventType.payment.returned
    attributes: {
        previousStatus: string
    }
    relationships: {
        payment: Relationship
        account: Relationship
        customer: Relationship
    }
}

interface StatementsCreated {
    type: typeof EventType.statements.created
}

export type TransactionCreated = BaseEvent & {
    type: typeof EventType.transaction.created
    attributes: {
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

