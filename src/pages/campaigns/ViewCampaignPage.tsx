import React from 'react';
import { useParams } from 'react-router';

import withLayout from '../../components/hoc/withLayout';

interface Props {
  address: string;
}

export const ViewCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();

  return <div>{address}</div>;
};

const ViewCampaignPageWithLayout = withLayout(ViewCampaignPage);
export default ViewCampaignPageWithLayout;
