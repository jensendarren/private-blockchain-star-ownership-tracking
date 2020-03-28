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
      it('promise is rejected and returns an error object', async () => {
        await blockchain._addBlock(null).catch(error => {
          expect(error.toString()).toBe("TypeError: Cannot set property 'height' of null")
        })
      })
    })
  })
})