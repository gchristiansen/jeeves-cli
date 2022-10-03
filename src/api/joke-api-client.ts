import * as http from 'typed-rest-client'
import {HttpClient} from '../common/http-client'

export interface JokeResponse {
  type: string,
  setup: string,
  punchline: string
}

export class JokeApiClient {

  httpClient = new HttpClient().getClient('https://official-joke-api.appspot.com')

  async getRandomJoke(): Promise<JokeResponse | null> {
    const response: http.IRestResponse<JokeResponse> =
      await this.httpClient.get<JokeResponse>('/random_joke')
    return response.result
  }

  async getJokeByType(jokeType: string): Promise<JokeResponse | null> {
    const uri = `/jokes/${jokeType}/random`
    const response: http.IRestResponse<JokeResponse[]> = await this.httpClient.get<JokeResponse[]>(uri)
    const responseList = response.result || []
    return responseList.pop() || null
  }

}
