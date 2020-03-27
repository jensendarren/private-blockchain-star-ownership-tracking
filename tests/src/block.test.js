const BlockClass = require('../../src/block.js')

describe('Block', () => {
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