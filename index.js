'use strict';
const getAbsoluteBlock = require('./lib/helpers').getAbsoluteBlock;

module.exports = (web3) => {

  /**
   * Returns blocks within range
   */
  function getBlocks(from, to) {
    const currBlock = web3.eth.blockNumber;
    const blockConditions = {
      from: getAbsoluteBlock(from, -100, currBlock),
      to: getAbsoluteBlock(to, 'latest', currBlock),
    };

    if (blockConditions.to < blockConditions.from) {
      return false;
    }

    const blocks = [];
    for (let i = blockConditions.from; i <= blockConditions.to; ++i) {
      blocks.push(web3.eth.getBlock(i));
    }
    return blocks;
  }

  /**
   * Returns simple filtered list of transactions
   * all conditions are optional and are AND-combined if provided
   *
   * conditions: {
   *   address: {
   *     to: (string) address
   *     from: (string) address,
   *   },
   *
   *   blocks: {
   *     from: (int) either block number (>= 0) or negative number (< 0) to indicate block number from latest block,
   *     to: (int) either block number (>= 0) or negative number (< 0) to indicate block number from latest block,
   *   },
   * }
   */
  function findTransactions(conditions) {
    conditions = Object.assign({
      address: {
        to: false,
        from: false,
      },
      blocks: {
        from: false,
        to: false,
      },
    }, conditions);

    const blocks = getBlocks(conditions.blocks.from, conditions.blocks.to);
    if (!blocks) {
      return [];
    }
    console.log(blocks.length);
  }

  return { getBlocks, findTransactions };
};
