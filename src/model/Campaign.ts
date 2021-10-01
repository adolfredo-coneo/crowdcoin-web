interface Campaign {
  id: string;
  description: string;
  header: string;
}

export interface ResponseCampaign {
  result: 'success' | 'error';
  campaign: Campaign | null;
  message: string;
}

export interface ResponseSummary {
  minimumContribution: number;
  balance: number;
  requestsCount: number;
  approversCount: number;
  manager: string;
}

export default Campaign;
