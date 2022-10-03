import {expect, test} from '@oclif/test'

describe('ip', () => {
  test
  .stdout()
  .command(['ip'])
  .it('runs weather', ctx => {
    expect(ctx.stdout).to.contain('weather world')
  })

  test
  .stdout()
  .command(['ip', '--name', 'jeff'])
  .it('runs weather --name jeff', ctx => {
    expect(ctx.stdout).to.contain('weather jeff')
  })
})
