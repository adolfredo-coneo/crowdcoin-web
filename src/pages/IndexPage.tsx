import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import CampaignList from '../components/CampaignList';
import CampaingAdd from '../components/CampaignAdd';
import Campaign from '../model/Campaign';
import withLayout from '../components/hoc/withLayout';
import { getCampaignsHandler } from '../ethereum/factoryHandlers';

interface Props {}

const IndexPage = (props: Props) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const history = useHistory();

  useEffect(() => {
    const getCampaigns = async () => {
      const items = await getCampaignsHandler();

      const campaigns = items.map((item: string) => {
        return {
          id: item,
          header: item,
          description: <a href="https://localhost">View the campaign</a>,
          fluid: true,
        };
      });
      setCampaigns(campaigns);
    };
    getCampaigns();
  }, []);

  const handleAddCampaign = () => {
    history.push(`/campaigns/new`);
  };

  return (
    <div>
      <h1>This is the campaign list page</h1>
      <h3>Open Campaigns</h3>
      <CampaingAdd description="Create Campaign" onClick={handleAddCampaign} />
      <CampaignList campaigns={campaigns} />
    </div>
  );
};

//export default IndexPage;
const IndexPageWithLayout = withLayout(IndexPage);
export default IndexPageWithLayout;
