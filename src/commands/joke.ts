import {Command, Flags, CliUx} from '@oclif/core'
import {JokeApiClient, JokeResponse} from '../api/joke-api-client'
import * as kleur from 'kleur'

export default class Joke extends Command {
  inquirer = require('inquirer')
  static description = 'describe the command here'

  static examples = [
    {
      description: 'Get a random joke',
      command: '<%= config.bin %> <%= command.id %>',
    },
    {
      description: 'Get a random joke by type',
      command: '<%= config.bin %> <%= command.id %> --type | -t',
    },
  ]

  static flags = {
    type: Flags.boolean({char: 't'}),
  }


  public async run(): Promise<void> {
    CliUx.ux.action.start('Thinking...')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {args, flags} = await this.parse(Joke)
    const jokeApiClient = new JokeApiClient()
    let jokeResponse: JokeResponse | null = null
    if (flags.type) {
      const jokeType = await this.askForType()
      CliUx.ux.action.stop('got it!')
      jokeResponse =
        await jokeApiClient.getJokeByType(jokeType)
      this.displayJoke(jokeResponse)
    } else {
      jokeResponse = await jokeApiClient.getRandomJoke()
      CliUx.ux.action.stop('got it!')
      this.displayJoke(jokeResponse)
    }

  }

  private displayJoke(joke: JokeResponse | null): void {
    if (joke != undefined) {
      this.log('')
      this.log(kleur.blue('-'.repeat(125)))
      CliUx.ux.action.start(`${joke?.setup}`)
      setTimeout(() => {
        CliUx.ux.action.stop(`${kleur.green(joke?.punchline)}`)
        this.log(kleur.blue('-'.repeat(125)))
        this.log('')
      }, 3000)
    } else {
      this.log(kleur.red('Joke returned is empty...hmm...guess humor is dead!'))
    }
  }

  private async askForType(): Promise<string> {
    const typeSelected = await this.inquirer.prompt([
      {
        type: 'list',
        name: 'jokeType',
        message: 'What category of joke would you like?',
        default: 'programming',
        choices: [
          'knock-knock',
          'programming',
        ],
      },
    ])
    return typeSelected.jokeType

  }

}
