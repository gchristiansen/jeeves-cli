import {Command, Flags} from '@oclif/core'

export default class Weather extends Command {
  static description = 'Get the current weather for a given zip code'

  static examples = [
    `$ jeeves weather 84101
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: '', required: false}),
  }

  static args = [{name: 'zipCode', description: 'The zipcode to retrieve weather information', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Weather)

    this.log(`Current weather for  ${args.zipCode}`)
  }
}
