const BlockClass = require('../../src/block.js')

describe('Block', () => {
  describe('validate()', () => {
    describe('when block is valid', () => {
      let block = new BlockClass.Block({data: 'Test Block'});
      it('returns true', async () =>{
        valid = await block.validate()
        expect(valid).toBe(true)
      })
    })
  })
})