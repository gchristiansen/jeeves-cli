import {Command, Flags, CliUx} from '@oclif/core'
import {IpApiClient} from '../../api/ip-api-client'
import * as kleur from 'kleur'

const fws = require('fixed-width-string')

export default class Internet extends Command {
  static description = 'Provides information about your internet ip address'

  static examples = [
    {
      description: 'Show internet ip address',
      command: '<%= config.bin %> <%= command.id %>',
    },
    {
      description: 'Show internet ip address with detail',
      command: '<%= config.bin %> <%= command.id %> -d | --detail',
    },
  ]

  static flags = {
    detail: Flags.boolean({char: 'd'}),
  }

  public async run(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {args, flags} = await this.parse(Internet)
    CliUx.ux.action.start('Retrieving info')

    const ipClient = new IpApiClient()

      if (flags.detail) {
        const ipDetail = await ipClient.getIpDetail()
        CliUx.ux.action.stop()
        this.log(kleur.blue('-'.repeat(75)))
        this.log(kleur.blue().bold(' '.repeat(30) + 'IP Info - Detail'))
        this.log(kleur.blue('-'.repeat(75)))
        const ipLabel = (fws('Internet IP:', 14, {align: 'right'}))
        const hostLabel = (fws('Hostname:', 14, {align: 'right'}))
        const ispLabel = (fws('ISP Name:', 14, {align: 'right'}))
        const locLabel = (fws('Location:', 14, {align: 'right'}))
        const regionLabel = (fws('Region:', 14, {align: 'right'}))
        const countryLabel = (fws('Country:', 14, {align: 'right'}))
        this.log(`${ipLabel} ` + kleur.green(`${ipDetail?.ip}`))
        this.log(`${hostLabel} ` + kleur.green(`${ipDetail?.hostname}`))
        this.log(`${ispLabel} ` + kleur.green(`${ipDetail?.org}`))
        this.log(`${locLabel} ` + kleur.green(`${ipDetail?.loc}`))
        this.log(`${regionLabel} ` + kleur.green(`${ipDetail?.region}`))
        this.log(`${countryLabel} ` + kleur.green(`${ipDetail?.country}`))
        this.log(kleur.blue('-'.repeat(75)))
      } else {
        const ip = await ipClient.getIp()
        CliUx.ux.action.stop()
        this.log('Internet IP Address: ' + kleur.green(ip))
      }

  }
}
