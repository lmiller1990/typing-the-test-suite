
expect.extend({
  toBeWithin(
    rec: number,
    floor: number,
    ceil: number
  ) {

    const pass = rec >= floor && rec <= ceil

    if (pass) {
      return {
        pass,
        message: () => ''
      }
    }

    const msg = 
      `Value ${rec} expected to be within ${floor} - ${ceil}`

    return {
      pass,
      message: () => msg
    }
  }
})

test('matcher', () => {
  expect(10).toBeWithin(0, 20)

  expect(0).toBeWithin(10, 20)
})