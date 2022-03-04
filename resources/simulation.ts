import {BaseResource} from "."
import {AchReceivedPayment, Application, ApplicationDocument, SimulateCreateAchReceivedPayment} from "../types"
import {UnitConfig, UnitResponse} from "../types"
import {
  SimulateApplicationApprove,
  SimulateApplicationDeny,
  SimulateDocumentReject,
} from "../types"

export class Simulations extends BaseResource {
  constructor(token: string, basePath: string, config?: UnitConfig) {
    super(token, basePath + "/sandbox", config)
  }

  public async applicationApprove(
    applicationId: string,
    request: SimulateApplicationApprove
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
    request: SimulateApplicationDeny
  ): Promise<UnitResponse<Application>> {
    return this.httpPost<UnitResponse<Application>>(
      `/applications/${applicationId}/deny`,
      {
        data: request,
      }
    )
  }

  public async documentApprove(
    applicationId: string,
    documentId: string
  ): Promise<UnitResponse<ApplicationDocument>> {
    return this.httpPost<UnitResponse<ApplicationDocument>>(
      `/applications/${applicationId}/documents/${documentId}/approve`,
      {}
    )
  }

  public async documentReject(
    applicationId: string,
    documentId: string,
    request: SimulateDocumentReject
  ): Promise<UnitResponse<ApplicationDocument>> {
    return this.httpPost<UnitResponse<ApplicationDocument>>(
      `/applications/${applicationId}/documents/${documentId}/reject`,
      {
        data: request,
      }
    )
  }

  public async createAchReceivedPayment(
      request: SimulateCreateAchReceivedPayment
  ): Promise<UnitResponse<AchReceivedPayment>> {
    return this.httpPost<UnitResponse<AchReceivedPayment>>(
        "/received-payments",
        {
          data: request,
        }
    )
  }

  public async completeAchReceivedPayment(
      id: string,
  ): Promise<UnitResponse<AchReceivedPayment>> {
    return this.httpPost<UnitResponse<AchReceivedPayment>>(
        `/received-payments/${id}/complete`,
    )
  }
}
