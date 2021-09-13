import {BaseResource} from "."
import {Application, ApplicationDocument} from "../types"
import {UnitConfig, UnitResponse} from "../types"
import {
  SimulateApproveApplicationRequest,
  SimulateDenyApplicationRequest,
  SimulateRejectDocumentRequest,
} from "../types"

export class Simulations extends BaseResource {
  constructor(token: string, basePath: string, config?: UnitConfig) {
    super(token, basePath + "/statements", config)
  }

  public async applicationApprove(
    applicationId: string,
    request: SimulateApproveApplicationRequest
  ): Promise<UnitResponse<Application>> {
    return this.httpPost<UnitResponse<Application>>(
      `/applications/${applicationId}/approve`,
      {
        data: request,
      }
    )
  }

  public async applicationDeny(
    applicationId: string,
    request: SimulateDenyApplicationRequest
  ): Promise<UnitResponse<Application>> {
    return this.httpPost<UnitResponse<Application>>(
      `/applications/${applicationId}/deny`,
      {
        data: request,
      }
    )
  }

  public async approveDocument(
    applicationId: string,
    documentId: string
  ): Promise<UnitResponse<ApplicationDocument>> {
    return this.httpPost<UnitResponse<ApplicationDocument>>(
      `/applications/${applicationId}/documents/${documentId}/approve`,
      {}
    )
  }

  public async rejectDocument(
    applicationId: string,
    documentId: string,
    request: SimulateRejectDocumentRequest
  ): Promise<UnitResponse<ApplicationDocument>> {
    return this.httpPost<UnitResponse<ApplicationDocument>>(
      `/applications/${applicationId}/documents/${documentId}/reject`,
      {
        data: request,
      }
    )
  }
}
