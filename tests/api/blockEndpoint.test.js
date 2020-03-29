// Require external libraries
const MockDate = require('mockdate');
const request = require('supertest')

// Require project classes
const server = require('../../app')
const BlockClass = require('../../src/block')
const address = "mmaPCpKEfyNrbED6KtrtX64rn8fm4GWTyz"
const message = `${address}:1585394:starRegistry`
const signature = 'IF2OMG/NA3y62aeavy+N9lh8eFblErRh6n6SIDDfEO7BDdo0KVonUh6vWppQ+2jQM6lrPsLwDz4vDMbo70f0YdY='
const star = {star: {
  "dec": "68° 52' 56.9",
  "ra": "16h 29m 1.0s",
  "story": "Testing the story 4"
}}

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
      block = new BlockClass.Block(star)
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
  describe('POST /requestValidation', () => {
    it('returns a message to be signed', async () => {
      MockDate.set(1585458878000)
      const res = await request(server.app).post('/requestValidation').send({address: address})
      let message = res.body
      expect(message).toBe('mmaPCpKEfyNrbED6KtrtX64rn8fm4GWTyz:1585458878:starRegistry')
      MockDate.reset()
    })
  })
  describe('POST /submitstar', () => {
    it('returns a new block containing the star data', async () => {
      MockDate.set(1585394314)
      const res = await request(server.app).post('/submitstar').send({
        address: address,
        message: message,
        star: star,
        signature: signature
      })
      let block = res.body
      expect(block.owner).toBe(address)
      expect(block.body).toBe("7b2273746172223a7b2273746172223a7b22646563223a223638c2b0203532272035362e39222c227261223a223136682032396d20312e3073222c2273746f7279223a2254657374696e67207468652073746f72792034227d7d7d")
      MockDate.reset()
    })
    it('returns a 500 error if the signature or timestamp is non valid', async () => {
      const res = await request(server.app).post('/submitstar').send({
        address: address,
        message: message,
        star: star,
        signature: signature
      })
      expect(res.status).toBe(500)
      expect(res.error.text).toBe("Message signature and/or timestamp is not valid. Try again!")
    })
  })
})