// Require external libraries
var MockDate = require('mockdate');

// Require project classes
const BlockchainClass = require('../../src/blockchain')
const BlockClass = require('../../src/block')

describe('Blockchain Class', () => {
  beforeEach(async () => {
    blockchain = new BlockchainClass.Blockchain()
    genesisBlock = blockchain.chain[0]
  })
  it('should have a chain with the genesis block', () => {
    expect(blockchain.chain).toStrictEqual([genesisBlock])
  })
  describe('getBlockByHash()', () => {
    it('returns the block corresponding to a block hash', async () => {
      let block = await blockchain.getBlockByHash(genesisBlock.hash)
      expect(block).toBe(genesisBlock)
    })
    it('returns undefined when there is no block with a matching hash', async () => {
      let block = await blockchain.getBlockByHash("ahashnotonthechain")
      expect(block).toBeUndefined()
    })
  })
  describe('requestMessageOwnershipVerification()', () => {
    it('returns a message to be singed', async () => {
      // Set the date to a fixed timestamp
      MockDate.set(1585394314)
      address = "tb1qa4ut0qq2ffqlxfagtpv24a2gjvggcrmcfhk9g2"
      message = await blockchain.requestMessageOwnershipVerification(address)
      timestamp = new Date().getTime().toString().slice(0, -3)
      expectedMessage = `${address}:${timestamp}:starRegistry`
      expect(message).toBe(expectedMessage)
      MockDate.reset()
    })
  })
  describe('submitStar()', () => {
    beforeEach(() => {
      MockDate.set(1585394314)
      address = "mmaPCpKEfyNrbED6KtrtX64rn8fm4GWTyz"
      message = `${address}:1585394:starRegistry`
      signature = 'IF2OMG/NA3y62aeavy+N9lh8eFblErRh6n6SIDDfEO7BDdo0KVonUh6vWppQ+2jQM6lrPsLwDz4vDMbo70f0YdY='
      star = {data: "A new star is born!"}
    })
    afterEach(() => {
      MockDate.reset()
    })
    describe('valid requests', () => {
      it('returns the block that was added to the blockchain', async () => {
        newBlock = await blockchain.submitStar(address, message, signature, star)
      })
    })
    describe('for invalid requests', () => {
      it('when signature does not match address it rejects and returns an error', () => {
        badSignature = 'IEypB5E2P9D2mPCOk7VM/y2mHQbXE1pA8Bc8hEvGbkz8NlFOOeHALDsbhKcw1vBy62YyKR+6Q7V1fFSbIoL/BDM='
        blockchain.submitStar(address, message, badSignature, star).catch(error => {
          expect(error.toString()).toBe("Message signature and/or timestamp is not valid. Try again!")
        })
      })
      it('when the elapsed time is > 5 mins it rejects and returns an error', () => {
        // Reset the date to the current time which will be more than 5 minutes from the message timestamp
        MockDate.reset()
        blockchain.submitStar(address, message, signature, star).catch(error => {
          expect(error.toString()).toBe("Message signature and/or timestamp is not valid. Try again!")
        })
      })
    })
  })
  describe('_addBlock()', () => {
    beforeEach(async () => {
      block = new BlockClass.Block({data: 'New block'})
      addedBlock = await blockchain._addBlock(block)
    })
    it('should add a new block to the blockchain', () => {
      expect(addedBlock).toStrictEqual(block)
    })
    it('sets the height to the current length of the chain', () => {
      let blockHeight = blockchain.height
      expect(addedBlock.height).toBe(blockHeight)
    })
    it('sets the correct timestamp to the block.time property', async () => {
      // Set the date to a fixed timestamp
      MockDate.set(1585394314)
      // Add a new block to the chain. The timestamp for this block will be the fixed date.
      addedBlock = await blockchain._addBlock(block)
      // Uncomment next line to pause which shows the MockDate is working
      // await new Promise(r => setTimeout(r, 2000));
      let timestamp = new Date().getTime().toString().slice(0,-3);
      expect(addedBlock.time).toBe(timestamp)
      MockDate.reset()
    })
    it('sets the hash correctly', () => {
      expect(block.hash.length).toBe(64)
    })
    it('sets the previousBlockHash correctly', () => {
      expect(block.previousBlockHash).toBe(genesisBlock.hash)
    })
    describe('when there is an error adding new block', () => {
      it('promise is rejected and returns an error object', () => {
        blockchain._addBlock(null).catch(error => {
          expect(error.toString()).toBe("TypeError: Cannot set property 'height' of null")
        })
      })
    })
  })
})