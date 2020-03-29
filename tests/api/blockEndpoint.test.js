const request = require('supertest')
const server = require('../../app')

describe('Block API Endpoints', () => {
  checkResHeadersAndStatus = (res) => {
    expect(res.header['content-type'].slice(0, 16)).toBe('application/json')
    expect(res.ok).toBeTruthy()
    expect(res.status).toBe(200)
  }
  describe('GET /block/0', () => {
    it('should return the Genesis block', async () => {
      const res = await request(server.app).get('/block/0')
      let block = res.body
      expect(block.height).toBe(0)
      expect(block.body).toBe('7b2264617461223a2247656e6573697320426c6f636b227d')
      checkResHeadersAndStatus(res)
    })
    it('should return block not found and 404 when passed an invalid height', async () => {
      const res = await request(server.app).get('/block/99')
      expect(res.status).toBe(404)
      expect(res.text).toBe('Block Not Found!')
    })
  })
  describe('GET /blockbyhash/:hash', () => {
    it('returns the block corresponding to a block hash', async () => {
      let genesisBlock = server.blockchain.getLatestBlock()
      const res = await request(server.app).get(`/blockbyhash/${genesisBlock.hash}`)
      let block = res.body
      expect(block.hash).toBe(genesisBlock.hash)
      checkResHeadersAndStatus(res)
    })
    it('should return block not found and 404 when passed an invalid hash', async () => {
      const res = await request(server.app).get('/blockbyhash/ahashthatdoesnotexist')
      expect(res.status).toBe(404)
      expect(res.text).toBe('Block Not Found!')
    })
  })
})