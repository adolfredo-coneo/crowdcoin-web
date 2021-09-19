import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

interface Props {}

const IndexPage = (props: Props) => {
  useEffect(() => {
    const getCampaigns = async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      console.log(campaigns);
    };
    getCampaigns();
  }, []);

  return (
    <div>
      <h1>This is the campaign list page</h1>
    </div>
  );
};

export default IndexPage;
