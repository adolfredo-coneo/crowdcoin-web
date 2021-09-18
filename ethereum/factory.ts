import web3 from './web3';
//import compiledFactory from './build/CompaignFactory.json';
const compiledFactory = require('./build/CompaignFactory.json');

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0x1e7241e29140f1bD6f0c4b63495C72FC083F689E'
);

export default instance;
