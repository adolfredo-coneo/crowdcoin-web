interface Campaign {
  id: string;
  description: string;
  header: string;
}

export interface Request {
  description: string;
  value: string;
  recipient: string;
  complete: boolean;
  approvalCount: string;
}

export interface Response {
  result: 'success' | 'error';
  message: string;
}

export interface ResponseCampaign extends Response {
  campaign: Campaign | null;
}

export interface ResponseSummary {
  minimumContribution: number;
  balance: string;
  requestsCount: number;
  approversCount: number;
  manager: string;
}

export interface ResponseRequests extends Response {
  requests: Request[];
}

export default Campaign;
