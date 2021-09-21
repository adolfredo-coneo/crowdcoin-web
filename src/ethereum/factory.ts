import web3 from './web3';
//import compiledFactory from './build/CompaignFactory.json';
const compiledFactory = require('../ethereum/build/CompaignFactory.json');

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  process.env.REACT_APP_FACCTORY_ADDRESS
);

export default instance;
