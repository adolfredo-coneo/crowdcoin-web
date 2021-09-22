import React from 'react';
import { Button } from 'semantic-ui-react';

interface CampaignAddProps {
  description: string;
}

const CampaignAdd: React.FC<CampaignAddProps> = ({ description }) => {
  return (
    <div>
      <Button content={description} icon="add circle" primary />
    </div>
  );
};

export default CampaignAdd;
