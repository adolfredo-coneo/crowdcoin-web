import React from 'react'
import Campaign from '../model/Campaign'
import { Card } from 'semantic-ui-react';

interface CampaignListProps {
    campaigns: Array<Campaign>
}

const CampaignList: React.FC<CampaignListProps> = ({campaigns}) => {
    return (
        <Card.Group items={campaigns} />
    )
}

export default CampaignList
