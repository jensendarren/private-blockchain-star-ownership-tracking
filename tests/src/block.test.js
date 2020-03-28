const BlockClass = require('../../src/block.js')

describe('Block', () => {
  describe('getBData()', () => {
    it('returns the block data decoded from hex to ascii', async () => {
      let data = {data: 'A message in the block'}
      block = new BlockClass.Block(data)
      block.height = 1
      bData = await block.getBData()
      expect(block.body).toBe('7b2264617461223a2241206d65737361676520696e2074686520626c6f636b227d')
      expect(bData).toStrictEqual(data)
    })
    it('does not return data from the genesis block', async () => {
      let genesisBlock = new BlockClass.Block('Genesis Block')
      genesisBlock.height = 0
      genesisBlock.previousBlockHash = "0x0"
      bData = await genesisBlock.getBData()
      expect(bData).toBeNull()
    })
  })
  describe('validate()', () => {
    beforeEach(() => {
      block = new BlockClass.Block({data: 'Test Block'});
      block.hash = block.calculateBlockHash()
    })
    describe('when block is valid', () => {
      it('returns true', async () =>{
        valid = await block.validate()
        expect(valid).toBeTruthy()
      })
    })
    describe('when block data properties have been tampered', () => {
      it('modifying body returns false', async () => {
        block.body = 'Yay! Ive hacked the block!'.toString('hex')
        valid = await block.validate()
        expect(valid).toBeFalsy()
      })
      it('modifying time returns false', async () => {
        block.time = 10
        valid = await block.validate()
        expect(valid).toBeFalsy()
      })
      it('modifying height returns false', async () => {
        block.height = 10
        valid = await block.validate()
        expect(valid).toBeFalsy()
      })
      it('modifying previousBlockHash returns false', async () => {
        block.previousBlockHash = "somelonghashthatisnotthepreviousblockhash!"
        valid = await block.validate()
        expect(valid).toBeFalsy()
      })
    })
  })
})