describe('sample test 101', () => {
  it('works as it should', () => {
    const num = 100

    expect(100).toEqual(100)
    expect(num).toEqual(100)
  })

  it('handles ranges as it should', () => {
    const age = 100

    expect(age).toBeGreaterThan(99)
  })
  it('makes a list of cat names', () => {
    const cats = ['Kimi', 'Felix']

    expect(cats).toEqual(cats)
    expect(cats).toContain('Kimi')
  })
})
