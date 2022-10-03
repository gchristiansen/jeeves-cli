import * as http from 'typed-rest-client'
import {HTTP_AGENT_NAME} from '../common/constants'

interface IpInfoResponse {
  ip: string
}

export interface IpInfoDetail {
  ip: string,
  hostname: string,
  city: string,
  region: string,
  country: string,
  loc: string,
  org: string,
  postal: string,
  timezone: string,
  readme: string
}

export class IpApiClient {

  async getIp(): Promise<string>  {
    const restClient: http.RestClient = new http.RestClient('http://velexio.com/jeeves-cli',
      'https://api.ipify.org?format=json')
    const response: http.IRestResponse<IpInfoResponse> = await restClient.get<IpInfoResponse>('')
    return response.result?.ip || 'Not-Found: You are an internet ghost'
  }

  async getIpDetail(): Promise<IpInfoDetail | null> {
    const myIp = await this.getIp()
    const apiUrl = `https://ipinfo.io/${myIp}/geo`
    const restClient: http.RestClient = new http.RestClient(HTTP_AGENT_NAME, apiUrl)
    const response: http.IRestResponse<IpInfoDetail> = await restClient.get<IpInfoDetail>('')
    return response.result
  }

}
