import React from 'react';
import { useParams } from 'react-router';

import withLayout from '../../components/hoc/withLayout';

interface Props {
  address: string;
}

export const ViewCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();

  return (
    <div>
      <h1>This is the campaign {address}</h1>
    </div>
  );
};

const ViewCampaignPageWithLayout = withLayout(ViewCampaignPage);
export default ViewCampaignPageWithLayout;
