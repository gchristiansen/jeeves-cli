import {expect, test} from '@oclif/test'

describe('weather world', () => {
  test
  .stdout()
  .command(['weather:world'])
  .it('runs weather world cmd', ctx => {
    expect(ctx.stdout).to.contain('weather world!')
  })
})
