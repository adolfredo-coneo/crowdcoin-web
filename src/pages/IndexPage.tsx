import React, { useEffect, useState } from 'react';

import factory from '../ethereum/factory';
import CampaignList from '../components/CampaignList';
import CampaingAdd from '../components/CampaignAdd';
import Campaign from '../model/Campaign';
import withLayout from '../components/hoc/withLayout';

interface Props {}

const IndexPage = (props: Props) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const items = await factory.methods.getDeployedCampaigns().call();

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

  return (
    <div>
      <h1>This is the campaign list page</h1>
      <h3>Open Campaigns</h3>
      <CampaignList campaigns={campaigns} />
      <CampaingAdd description="Create Campaign" />
    </div>
  );
};

//export default IndexPage;
const IndexPageWithLayout = withLayout(IndexPage);
export default IndexPageWithLayout;
