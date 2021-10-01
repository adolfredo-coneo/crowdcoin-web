import { ResponseSummary } from '../../model/Campaign';
import getCampaign from '../campaign';
//import web3 from '../web3';

export const getCampaignSummaryHandler = async (address: string): Promise<ResponseSummary> => {
  const campaign = await getCampaign(address);

  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};
