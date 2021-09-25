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

export default Campaign;
