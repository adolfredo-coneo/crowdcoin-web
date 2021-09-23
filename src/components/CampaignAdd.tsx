import React from 'react';
import { Button } from 'semantic-ui-react';

interface CampaignAddProps {
  description: string;
  onClick: () => void;
}

const CampaignAdd: React.FC<CampaignAddProps> = ({ description, onClick}) => {
  return (
    <div>
      <Button floated="right" content={description} icon="add circle" onClick={onClick} primary />
    </div>
  );
};

export default CampaignAdd;
