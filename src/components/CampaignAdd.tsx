import React from 'react';
import { Button } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface CampaignAddProps {
  description: string;
  icon?: string;
  floated?: 'right' | 'left';
  color?: SemanticCOLORS;
  onClick: () => void;
  basic?: boolean;
  loading?: boolean;
}

const CampaignAdd: React.FC<CampaignAddProps> = ({
  description,
  icon,
  floated = 'right',
  onClick,
  color = 'blue',
  basic,
  loading = false,
}) => {
  return (
    <Button
      floated={floated}
      content={description}
      icon={icon}
      onClick={onClick}
      color={color}
      basic={basic}
      loading={loading}
      disabled={loading}
    />
  );
};

export default CampaignAdd;
