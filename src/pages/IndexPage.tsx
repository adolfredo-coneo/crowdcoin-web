import React, { useEffect, useState } from 'react';

import factory from '../ethereum/factory';
import CampaignList from '../components/CampaignList';
import Campaign from '../model/Campaign';

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
          fluid: true
        };
      });
      setCampaigns(campaigns);
    };
    getCampaigns();
  }, []);

  return (
    <div>
      <h1>This is the campaign list page</h1>
      <h2>Campaigns</h2>
      {
        <CampaignList campaigns={campaigns} />
      }
    </div>
  );
};

export default IndexPage;
