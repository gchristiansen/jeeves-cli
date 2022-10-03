import * as http from 'typed-rest-client'
import {HttpClient} from '../common/http-client'
import {IpApiClient, IpInfoDetail} from './ip-api-client'
import {IRestResponse} from 'typed-rest-client'

export interface WeatherApiResponse {
  weather: WeatherDetail,
  main: TempDetail,
  wind: WindDetail,
  name: string,
  sys: SysDetail,
  cityGeo: CityGeo
}

export interface SysDetail {
  country: string,
  sunrise: number,
  sunset: number
}

export interface WeatherDetail {
  main: string,
  description: string
}

export interface TempDetail {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

export interface WindDetail {
  speed: number,
  deg: number,
  gust: number
}

export interface GeoInfo {
  zip: string,
  name: string,
  lat: number,
  lon: number
  country: string
}

export interface CityGeo {
  name: string,
  lat: number,
  lon: number,
  country: string,
  state: string
}

export class WeatherApiClient {

  httpClient = new HttpClient().getClient('http://api.openweathermap.org/')
  defaultUnit = 'imperial'
  apiKey='eb1369a7b5dc7fcb44a980fa15fc802d'
  inquirer = require('inquirer')

  async getMyWeather(): Promise<WeatherApiResponse | null>  {
    const ipInfo: IpInfoDetail | null = await new IpApiClient().getIpDetail()
    const locArr = ipInfo?.loc.split(',') || []
    const lat = Number(locArr[0])
    const lon = Number(locArr[1])
    const uri = `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${this.defaultUnit}&appid=${this.apiKey}`
    const response: http.IRestResponse<WeatherApiResponse> = await this.httpClient.get<WeatherApiResponse>(uri)
    const responseObject = response.result
    const cityGeo: CityGeo = await this.getCityFromLoc(lat, lon)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    responseObject.cityGeo = cityGeo
    return responseObject
  }

  async getWeatherByZip(zip: string): Promise<WeatherApiResponse | null> {
    const geo: GeoInfo | null = await this.getGeoFromZip(zip)
    const uri = `/data/2.5/weather?lat=${geo?.lat}&lon=${geo?.lon}&units=${this.defaultUnit}&appid=${this.apiKey}`
    const response: http.IRestResponse<WeatherApiResponse> = await this.httpClient.get<WeatherApiResponse>(uri)
    const responseObject = response.result
    const cityGeo: CityGeo = await this.getCityFromLoc(geo?.lat, geo?.lon)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    responseObject.cityGeo = cityGeo
    return responseObject
  }

  async getWeatherByCity(city: string): Promise<WeatherApiResponse | null> {
    const formattedCity = city
      .replace(' ', '%20')
      .replace('-', '%20')
      .replace('_', '%20')
    const cityGeoOptions: CityGeo[] = await this.getGeoFromCity(formattedCity)
    const cityGeo: CityGeo =
      cityGeoOptions.length > 1 ? (await this.getCitySelection(cityGeoOptions)) : cityGeoOptions[0]
    const uri = `/data/2.5/weather?lat=${cityGeo.lat}&lon=${cityGeo.lon}&units=${this.defaultUnit}&appid=${this.apiKey}`
    const response: http.IRestResponse<WeatherApiResponse> = await this.httpClient.get<WeatherApiResponse>(uri)
    const responseObj = response.result
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    responseObj.cityGeo = cityGeo
    return responseObj
  }

  async getGeoFromZip(zip: string): Promise<GeoInfo | null> {
    const uri = `/geo/1.0/zip?zip=${zip}&appid=${this.apiKey}`
    // console.log(kleur.red(`DEBUG: Getting zip using uri: ${uri}`))
    const resp: IRestResponse<GeoInfo> =  await this.httpClient.get<GeoInfo>(uri)
    return resp.result
  }

  private async getGeoFromCity(cityName: string): Promise<CityGeo[] | []> {
    const uri = `/geo/1.0/direct?q=${cityName}&limit=10&appid=${this.apiKey}`
    // console.log(kleur.red(`DEBUG: Getting zip using uri: ${uri}`))
    const resp: IRestResponse<CityGeo[]> =  await this.httpClient.get<CityGeo[]>(uri)
    return resp.result != undefined ? resp.result : []
  }

  private async getCityFromLoc(lat: number | undefined, lon: number | undefined): Promise<CityGeo> {
    const uri = `/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    // console.log(kleur.red(`DEBUG: Getting zip using uri: ${uri}`))
    const resp: IRestResponse<CityGeo[]> =  await this.httpClient.get<CityGeo[]>(uri)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return resp.result[0]

  }

  private async getCitySelection(cityOptions: CityGeo[]) {
    const displayList = []
    for (const o of cityOptions) {
      displayList.push({name: `${o.name}, ${o.state} ${o.country}`, value: o})
    }

    const selectedOption = await this.inquirer.prompt([
      {
        type: 'list',
        name: 'city',
        message: 'Which city?',
        choices: displayList,
      },
    ])
    return selectedOption.city

  }

}


