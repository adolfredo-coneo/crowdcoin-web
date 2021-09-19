import web3 from './web3';
//import compiledFactory from './build/CompaignFactory.json';
const compiledFactory = require('./build/CompaignFactory.json');

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0x7E73D76C96041aA21d3c3407A3CB4708f768E40C'
);

export default instance;
