import React from 'react';
import { Button } from 'semantic-ui-react';

interface CampaignAddProps {
  description: string;
  icon?: string;
  floated?: 'right' | 'left';
  onClick: () => void;
}

const CampaignAdd: React.FC<CampaignAddProps> = ({
  description,
  icon,
  floated = 'right',
  onClick,
}) => {
  return (
    <Button
      floated={floated}
      content={description}
      icon={icon}
      onClick={onClick}
      primary
    />
  );
};

export default CampaignAdd;
