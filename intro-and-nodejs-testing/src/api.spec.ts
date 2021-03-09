import { Server } from 'http'
import * as axios from 'axios'
import { createApp, SECRET_KEY } from './api'
import * as jwt from 'jsonwebtoken'

describe('app', () => {
  let app: Server
  beforeEach((done) => {
    app = createApp().listen(8080, done)
  })

  afterEach((done) => {
    app.close(done)
  })

  it('get data', async () => {
    interface Data {
      foo: string
    }
    const res = await axios.default.get<Data>('http://localhost:8080/data')
    expect(res.data).toEqual<Data>({ foo: 'bar' })
  })

  it('successfully auth', async () => {
    const token = jwt.sign('token', SECRET_KEY)
    const res = await axios.default.post(
      'http://localhost:8080/login', 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    expect(res.status).toBe(200)
  })

  it('fails to auth', async () => {
    const token = jwt.sign('token', 'fake key')
    const res = () => axios.default.post(
      'http://localhost:8080/login', 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // try {
    //   await res()
    // } catch (e) {
    //   expect(e.response.status).toBe(401)
    // }
    await expect(res).rejects.toHaveProperty(
      'response.status', 401)
  })
})