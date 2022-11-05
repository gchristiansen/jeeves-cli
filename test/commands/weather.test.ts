import {expect, test} from '@oclif/test'

describe('weather', () => {
  test
  .stdout()
  .command(['weather'])
  .it('runs weather', ctx => {
    expect(ctx.stdout).to.contain('City:')
  })

  test
  .stdout()
  .command(['weather', '--zip', '84088'])
  .it('runs weather --zip 84088', ctx => {
    expect(ctx.stdout).to.contain('City:  West Jordan')
  })
})
