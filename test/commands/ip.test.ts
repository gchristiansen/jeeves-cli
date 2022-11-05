import {expect, test} from '@oclif/test'

describe('ip', () => {
  test
  .stdout()
  .command(['ip'])
  .it('runs ip', ctx => {
    expect(ctx.stdout).to.contain('IP Address:')
  })

  test
  .stdout()
  .command(['ip internet'])
  .it('runs ip internet', ctx => {
    expect(ctx.stdout).to.contain('Internet IP Address:')
  })
})
