import factory from './factory';
import web3 from './web3';
import { ResponseCampaign } from '../model/Campaign';

export const createCampaignHandler = async (
  minimumContribution: string
): Promise<ResponseCampaign> => {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await factory.methods
      .createCampaign(minimumContribution)
      .send({
        from: accounts[0],
      });
    return {
      result: 'success',
      campaign: result,
      message: 'Campaign Created!',
    };
  } catch (err: any) {
    return { result: 'error', campaign: null, message: err.message };
  }
};

export const getCampaignsHandler = async () => {
  const items = await factory.methods.getDeployedCampaigns().call();

  return items;
};
