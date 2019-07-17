import formatMoney from '../lib/formatMoney'

describe('formatMoney function', () => {
  it('works with fractional pounds', () => {
    expect(formatMoney(1)).toEqual('£0.01')
    expect(formatMoney(10)).toEqual('£0.10')
  })

  it('leaves pence off whole pounds', () => {
    expect(formatMoney(100)).toEqual('£1')
    expect(formatMoney(50000000)).toEqual('£500,000')
  })
})
