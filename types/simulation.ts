import { ReasonCode, Relationship } from ".";

export interface SimulateApproveApplicationRequest {
  type: "applicationApprove";
  attributes: {
    reason: string;
  };
}

export interface SimulateDenyApplicationRequest {
  type: "applicationDeny";
  attributes: {
    reason: string;
  };
}

export interface SimulateRejectDocumentRequest {
  type: "documentReject";
  attributes: {
    reason: "blurry image";
    reasonCode: ReasonCode;
  };
}

interface SimulateReceiveAchPayment {
  type: "achPayment";
  attributes: {
    amount: number;
    direction: "Credit" | "Debit";
    description: string;
  };
  relationships: {
    account: {
      type: "depositAccount";
      id: string;
    };
  };
}

interface SimulateTransmitAchPayment {
  type: "transmitAchPayment";
  relationships: {
    payment: {
      type: "achPayment";
      id: string;
    };
  };
}

interface SimulateClearAchPayment {
  type: "clearAchPayment";
  relationships: {
    payment: {
      type: "achPayment";
      id: string;
    };
  };
}

interface SimulateReturnAchPayment {
  type: "returnAchPayment";
  relationships: {
    payment: {
      type: "achPayment";
      id: string;
    };
  };
}

interface SimulateReceiveWirePayment {
  type: "wirePayment";
  attributes: {
    amount: number;
    description: string;
  };
  relationships: {
    account: {
      data: {
        type: "depositAccount";
        id: string;
      };
    };
  };
}

interface SimulateCardAuthorization {
  type: "authorization";
  attributes: {
    amount: number;
    cardLast4Digits: string;
    merchantName: string;
    /**
     * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
     */
    merchantType: number;
    merchantLocation: string;
    recurring?: boolean;
  };
  relationships: {
    account: {
      data: {
        type: "depositAccount";
        id: string;
      };
    };
  };
}

interface SimulateCardPurchase {
  type: "purchaseTransaction";
  attributes: {
    amount: number;
    direction: string;
    merchantName: string;
    /**
     * The 4-digit ISO 18245 merchant category code (MCC). Use any number (e.g. 1000 for testing).
     */
    merchantType: number;
    merchantLocation: string;
    coordinates?: {
      longitude: number;
      latitude: number;
    };
    last4Digits: string;
    recurring: false;
  };
  relationships: {
    account: {
      data: {
        type: "depositAccount";
        id: string;
      };
    };
  };
}
