import {
  Response,
  ResponseRequests,
  ResponseSummary,
} from '../../model/Campaign';
import getCampaign from '../campaign';
import web3 from '../web3';

export const getCampaignSummaryHandler = async (
  address: string
): Promise<ResponseSummary> => {
  const campaign = await getCampaign(address);

  const summary = await campaign.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: web3.utils.fromWei(summary[1], 'ether'),
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export const contributeCampianHandler = async (
  address: string,
  amount: string
): Promise<Response> => {
  try {
    const campaign = await getCampaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether'),
    });

    return { result: 'success', message: 'Contribution Successfully' };
  } catch (err: any) {
    return { result: 'error', message: err.message };
  }
};

export const createRequest = async (
  address: string,
  description: string,
  amount: string,
  recipient: string
): Promise<Response> => {
  try {
    const campaign = await getCampaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods
      .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
      .send({
        from: accounts[0],
      });

    return { result: 'success', message: 'Request Successfully' };
  } catch (err: any) {
    return { result: 'error', message: err.message };
  }
};

export const getAllRequestsHandler = async (
  address: string
): Promise<ResponseRequests> => {
  try {
    const campaign = await getCampaign(address);

    const requests = await campaign.methods.getAllRequests().call();

    return {
      result: 'success',
      message: '',
      requests,
    };
  } catch (err: any) {
    return { result: 'error', message: err.message, requests: [] };
  }
};
