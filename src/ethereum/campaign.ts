import web3 from './web3';
const compiledCampaign = require('../ethereum/build/Compaign.json');

const getCampaign = (address: string) => {
  return new web3.eth.Contract(compiledCampaign.abi, address);
};

export default getCampaign;
