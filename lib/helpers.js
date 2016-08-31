/**
 * Returns absolute block number
 * if negative number is provider, it is taken as the count of block before current block
 * else return the block number
 */
function getAbsoluteBlock(block, defaultBlock, currBlock) {
  if (block === undefined || block === false) {
    block = defaultBlock;
  }

  if (block === 'latest') {
    return currBlock;
  }

  block = parseInt(block);
  if (block < 0) {
    return currBlock + block;
  }
  return block;
}

module.exports = {
  getAbsoluteBlock,
};
