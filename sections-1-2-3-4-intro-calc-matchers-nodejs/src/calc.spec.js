// Two or more numbers, comma delimited, 
// returns the sum 
// eg: '1, 2,3, 4 ' => 10
// Consider the numbers may have whitespace
// Negative numbers throw an exception 
// with the message 
// '-1,2,-3' => 'negatives not allowed: -1,-3'

function calc(input) {
  const result = input.split(',')
    .reduce((acc, curr) => {
      if (curr.trim().length === 0) {
        return acc
      }
      const n = parseInt(curr, 10)

      if (n < 0) {
        return {
          sum: acc.sum,
          negatives: acc.negatives.concat(n)
        }
      }

      return {
        sum: acc.sum + n,
        negatives: acc.negatives
      }
    }, {
      sum: 0,
      negatives: []
    })

  if (result.negatives.length > 0) {
    const nums = result.negatives.join(', ')
    const msg = `Negative numbers not supported: ${nums}`
    throw Error(msg)
  }

  return result.sum
}

describe('calc', () => {
  it('adds up numbers', () => {
    const input = '1,2,3'
    const output = 6
    expect(calc(input)).toBe(output)
  })

  it('consider whitespace', () => {
    const input = '1,  2,  3 ,,'
    const output = 6
    expect(calc(input)).toBe(output)
  })

  it('considers negative numbers', () => {
    const input = '-1,-2,    10'
    const subject = () => calc(input)

    expect(subject).toThrowError(
      'Negative numbers not supported: -1, -2'
    )
  })
})