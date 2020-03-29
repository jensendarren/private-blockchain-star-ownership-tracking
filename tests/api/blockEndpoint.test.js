const request = require('supertest')
const server = require('../../app')
const BlockClass = require('../../src/block')
const address = "mmaPCpKEfyNrbED6KtrtX64rn8fm4GWTyz"

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
  describe('GET /blocks/:address', () => {
    createStarBlock = () => {
      block = new BlockClass.Block({star: {
        "dec": "68° 52' 56.9",
        "ra": "16h 29m 1.0s",
        "story": "Testing the story 4"
      }})
      block.owner = address
      return block
    }
    it('returns an array of star objects as json', async () => {
      await server.blockchain._addBlock(createStarBlock())
      await server.blockchain._addBlock(createStarBlock())
      const res = await request(server.app).get(`/blocks/${address}`)
      let stars = res.body
      expect(stars.length).toBe(2)
      expect(stars[0].owner).toBe(address)
      expect(stars[1].owner).toBe(address)
      expect(stars[0].star).toStrictEqual({
        "dec": "68Â° 52' 56.9",
        "ra": "16h 29m 1.0s",
        "story": "Testing the story 4"
      })
    })
    it('returns an empty array if the owner does not have any stars', async () => {
      const res = await request(server.app).get(`/blocks/anaddresswithnostars`)
      let stars = res.body
      expect(stars).toStrictEqual([])
    })
  })
  describe('POST /submitstar', () => {
  })
})