import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import withLayout from '../../components/hoc/withLayout';
import { getCampaignSummaryHandler } from '../../ethereum/handlers/campaignHandlers';

interface Props {
  address: string;
}

export const ViewCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();

  useEffect(() => {
    const getSummary = async () => {
      const summary = await getCampaignSummaryHandler(address);
      console.log(summary);
    };

    getSummary();
  }, [address]);

  return (
    <div>
      <h1>This is the campaign {address}</h1>
    </div>
  );
};

const ViewCampaignPageWithLayout = withLayout(ViewCampaignPage);
export default ViewCampaignPageWithLayout;
