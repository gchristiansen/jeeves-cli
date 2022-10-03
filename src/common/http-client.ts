import * as http from 'typed-rest-client'
import {HTTP_AGENT_NAME} from './constants'

export class HttpClient {
  getClient(apiEndpoint: string): http.RestClient {
    return new http.RestClient(HTTP_AGENT_NAME, apiEndpoint)
  }
}
