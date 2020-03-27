const BlockClass = require('../../src/block.js')

describe('Block', () => {
  describe('validate()', () => {
    describe('when block is valid', () => {
      beforeEach(() => {
        block = new BlockClass.Block({data: 'Test Block'});
        block.hash = block.calculateBlockHash()
      })

      it('returns true', async () =>{
        valid = await block.validate()
        expect(valid).toBeTruthy()
      })
    })
    describe('when block is NOT valid', () => {
      beforeEach(() => {
        block = new BlockClass.Block({data: 'Another test block'})
        block.hash = block.calculateBlockHash()
        // Lets change the body without updating the hash
        block.body = 'Yay! Ive hacked the block!'.toString('hex')
      })

      it('returns false', async () => {
        valid = await block.validate()
        expect(valid).toBeFalsy()
      })
    })
  })
})