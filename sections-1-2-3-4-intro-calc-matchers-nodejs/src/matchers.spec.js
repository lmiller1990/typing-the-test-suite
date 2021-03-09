test('toBe', () => {
  expect(1).toBe(1)
  expect('cat').toBe('cat')
  const a = {
    foo: 'bar'
  }
  const b = {
    foo: 'bar'
  }

  expect(a).toBe(b) // fail (via ===)
  expect(a).toBe(a) // true (via ===)
  expect([]).toBe([]) // fails (via ===)

  expect('a').toBe('a') // ok
  expect('a').toEqual('a') // also ok

  expect([]).not.toBe([]) // not modifier!
})

const a = {
  foo: {
    num: 1
  }
}

test('toHaveProperty', () => {
  expect(a).toHaveProperty('foo', { num: 1 }) // ok!
})

test('resolves', () => {
  const p = new Promise(res => {
    setTimeout(() => {
      res(a)
    })
  })

  return expect(p).resolves.toEqual({
    foo: {
      num: 1
    }
  })
})

test('rejects', () => {
  const p = new Promise((res, rej) => {
    setTimeout(() => {
      rej(a)
    })
  })

  return expect(p).rejects.toEqual({
    foo: {
      num: 1
    }
  })
})

test('mock function', () => {
  const fetchData = (cb) => {
    const val = 'Data'
    cb(val)
  }

  const cb = jest.fn()
  fetchData(cb)
  expect(cb).toHaveBeenCalledWith('Data')
})

test('done', (done) => {
  setTimeout(() => {
    expect(1).toBe(1)
    done()
  }, 3000)
})
