import {expect, test} from '@oclif/test'

describe('weather', () => {
  test
  .stdout()
  .command(['weather', 'friend', '--from=oclif'])
  .it('runs weather cmd', ctx => {
    expect(ctx.stdout).to.contain('weather friend from oclif!')
  })
})
