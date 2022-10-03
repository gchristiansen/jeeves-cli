import {Command} from '@oclif/core'
import * as kleur from 'kleur'


export default class Ip extends Command {
  static description = 'Provides information about your internet ip address'

  static examples = [
    {
      description: 'Show machine ip address',
      command: '<%= config.bin %> <%= command.id %>',
    },
  ]

  public async run(): Promise<void> {

      const {networkInterfaces} = require('os')
      const nets = networkInterfaces()

      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
          const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
          if (net.family === familyV4Value && !net.internal) {
            this.log('IP Address: ' + kleur.green(net.address))
          }
        }
      }

    }

}
