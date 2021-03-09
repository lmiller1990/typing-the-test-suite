function isEven(num) {
  return num % 2 === 0
}

describe('isEven', () => {
  it.each([
    [0, true],
    [-0, true],
    [1, false],
    [2, true],
  ])('isEven(%i)', (input, output) => {
    const result = isEven(input)
    expect(result).toBe(output)
  })

  it('returns true', () => {
    const result = isEven(0)
    expect(result).toBe(true)
  })

  it('returns true', () => {
    const result = isEven(-0)
    expect(result).toBe(true)
  })

  it('returns true', () => {
    const result = isEven(2)
    expect(result).toBe(true)
  })

  it('returns false', () => {
    const result = isEven(1)
    expect(result).toBe(false)
  })
})