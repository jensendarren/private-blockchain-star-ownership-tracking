const request = require('supertest')
const app = require('../../app')

describe('Block API Endpoints', () => {
  describe('GET /block/0', () => {
    it.skip('should return the Genesis block', async () => {
      const res = await request(app).get('/block/0')
      expect(res.header['content-type'].slice(0, 16)).toBe('application/json')
      expect(res.ok).toBeTruthy()
      expect(res.status).toBe(200)
      expect(res.body.height).toBe(0)
      expect(res.body.body).toBe('7b2264617461223a2247656e6573697320426c6f636b227d')
    })
  })
})