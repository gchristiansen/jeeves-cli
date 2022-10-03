import {Command, Flags, CliUx} from '@oclif/core'
import {WeatherApiClient, WeatherApiResponse} from '../api/weather-api-client'

import * as kleur from 'kleur'

const fws = require('fixed-width-string')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

export default class Weather extends Command {

  static description = 'describe the command here'

  static examples = [
    {
      description: 'Show weather based on machine location (Uses GeoIp info)',
      command: '<%= config.bin %> <%= command.id %>',
    },
    {
      description: 'Show weather for specified city',
      command: '<%= config.bin %> <%= command.id %> --city | -c',
    },
    {
      description: 'Show weather for city with multiple words - option 1 enclose in ""',
      command: '<%= config.bin %> <%= command.id %> --city "salt lake city"',
    },
    {
      description: 'Show weather for city with multiple words - option 2 use either "-" or "_" to separate ',
      command: '<%= config.bin %> <%= command.id %> --city salt-lake-city',
    },
    {
      description: 'Show weather for common city name, include country code to be more specific',
      command: '<%= config.bin %> <%= command.id %> --city london,uk or <%= config.bin %> <%= command.id %> --city london,us',
    },
    {
      description: 'Show weather for specified zip code',
      command: '<%= config.bin %> <%= command.id %> --zip | -z',
    },
    {
      description: 'Show weather for specified zip code outside US, then country code must be included',
      command: '<%= config.bin %> <%= command.id %> --zip 6000,ph',
    },
  ]

  static flags = {
    zip: Flags.string({
      char: 'z',
      description: 'Zip code to retrieve weather from',
    }),
    city: Flags.string({
      char: 'c',
      exclusive: ['zip'],
    }),
  }


  public async run(): Promise<void> {
    CliUx.ux.action.start('Retrieving weather')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {args, flags} = await this.parse(Weather)
    const weatherApiClient = new WeatherApiClient()
    if (flags.zip != undefined) {
      const weatherData: WeatherApiResponse | null = await weatherApiClient.getWeatherByZip(flags.zip)
      CliUx.ux.action.stop('')
      this.displayWeather(weatherData)
    } else if (flags.city != undefined) {
      const weatherInfo: WeatherApiResponse | null = await  weatherApiClient.getWeatherByCity(flags.city)
      CliUx.ux.action.stop('')
      this.displayWeather(weatherInfo)
    } else {
      const weatherInfo: WeatherApiResponse | null = await  weatherApiClient.getMyWeather()
      CliUx.ux.action.stop('')
      this.displayWeather(weatherInfo)
    }
  }

  private displayWeather(weather: WeatherApiResponse | null): void {

    dayjs.extend(utc)
    this.log(kleur.blue('-'.repeat(75)))
    this.log(kleur.blue().bold(' '.repeat(30) + 'Weather Info'))
    this.log(kleur.blue('-'.repeat(75)))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const displayState = weather.cityGeo.state != undefined ? weather.cityGeo.state : ''
    if (weather != undefined) {
      const cityLabel = (fws('City: ', 12, {align: 'right'}))
      const tempLabel = (fws('Temp: ', 12, {align: 'right'}))
      const feelsLabel = (fws('Feels Like: ', 12, {align: 'right'}))
      const humidityLabel = (fws('Humidity: ', 12, {align: 'right'}))
      const minTempLabel = (fws('Min Temp: ', 12, {align: 'right'}))
      const maxTempLabel = (fws('Max Temp: ', 12, {align: 'right'}))
      const windLabel = (fws('Wind: ', 12, {align: 'right'}))
      const sunriseLabel = (fws('Sunrise: ', 12, {align: 'right'}))
      const sunsetLabel = (fws('Sunset: ', 12, {align: 'right'}))
      this.log(`${cityLabel} ` + kleur.green(`${weather.cityGeo.name}, ${displayState} ${weather.cityGeo.country}`))
      this.log(`${tempLabel} ` + kleur.green(`${Math.round(weather.main.temp)}° F`))
      this.log(`${feelsLabel} ` + kleur.green(`${Math.round(weather.main.feels_like)}° F`))
      this.log(`${humidityLabel} ` + kleur.green(`${Math.round(weather.main.humidity)}%`))
      this.log(`${minTempLabel} ` + kleur.green(`${Math.round(weather.main.temp_min)}° F`))
      this.log(`${maxTempLabel} ` + kleur.green(`${Math.round(weather.main.temp_max)}° F`))
      this.log(`${windLabel} ` + kleur.green(`${Math.round(weather.wind.speed)} mph`))
      this.log('')
      this.log(`${sunriseLabel} ` + kleur.green(`${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}`))
      this.log(`${sunsetLabel} ` + kleur.green(`${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}`))
      this.log(kleur.blue('-'.repeat(75)))
      this.log('')
      this.log(kleur.yellow('* Sunrise/Sunset times are local times using your machine timezone'))
      this.log('')

    } else {
      this.log(kleur.red('Weather not returned...must be really bad out there!'))
    }
  }
}
