import { BaseResource } from ".";
import { ReasonCode } from "../types";
import { UnitConfig, UnitResponse } from "../types/common";
import {
  SimulateApproveApplicationRequest,
  SimulateDenyApplicationRequest,
  SimulateRejectDocumentRequest,
} from "../types/simulation";

export class Simulations extends BaseResource {
  constructor(token: string, basePath: string, config?: UnitConfig) {
    super(token, basePath + "/statements", config);
  }

  public async applicationApprove(
    applicationId: string,
    request: SimulateApproveApplicationRequest
  ): Promise<UnitResponse<unknown>> {
    return this.httpPost<UnitResponse<unknown>>(
      `/applications/${applicationId}/approve`,
      {
        data: request,
      }
    );
  }

  public async applicationDeny(
    applicationId: string,
    request: SimulateDenyApplicationRequest
  ): Promise<UnitResponse<unknown>> {
    return this.httpPost<UnitResponse<unknown>>(
      `/applications/${applicationId}/deny`,
      {
        data: request,
      }
    );
  }

  public async approveDocument(
    applicationId: string,
    documentId: string
  ): Promise<UnitResponse<unknown>> {
    return this.httpPost<UnitResponse<unknown>>(
      `/applications/${applicationId}/documents/${documentId}/approve`,
      {}
    );
  }

  public async rejectDocument(
    applicationId: string,
    documentId: string,
    request: SimulateRejectDocumentRequest
  ): Promise<UnitResponse<unknown>> {
    return this.httpPost<UnitResponse<unknown>>(
      `/applications/${applicationId}/documents/${documentId}/reject`,
      {
        data: request,
      }
    );
  }
}
