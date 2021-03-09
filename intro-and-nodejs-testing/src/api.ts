import * as express from 'express'
import * as jwt from 'jsonwebtoken'

export const SECRET_KEY = 'secret'

export const createApp = () => {
  const app = express()
  app.get('/data', (req, res) => {
    res.json({ foo: 'bar' })
  })

  app.post('/login', (req, res) => {
    const auth = req.headers.authorization
    if (!auth) {
      res.sendStatus(401)
    }
    // Authorization: Bearer ____
    const [_, token] = auth.split(' ')
    try {
      jwt.verify(token, SECRET_KEY)
    } catch (e) {
      res.sendStatus(401)
    }

    res.sendStatus(200)
  })

  return app
}
