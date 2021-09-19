import web3 from './web3';
//import compiledFactory from './build/CompaignFactory.json';
const compiledFactory = require('../ethereum/build/CompaignFactory.json');

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0x0bB6DC76e8A41DaF60Ea202283a656C3e001b75c'
);

export default instance;
