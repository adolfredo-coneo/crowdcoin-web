import React from 'react';
import { useHistory, useParams } from 'react-router';

import withLayout from '../../components/hoc/withLayout';
import CampaingAdd from '../../components/CampaignAdd';

interface Props {
  address: string;
}

export const RequestsCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();
  const history = useHistory();

  const handleCreateRequest = () => {
    history.push(`/campaigns/${address}/requests/new`);
  };

  return (
    <div>
      <h3>Requests List</h3>
      <CampaingAdd
        description="Create Request"
        floated="left"
        onClick={handleCreateRequest}
      />
    </div>
  );
};

const RequestsCampaignPageWithLayout = withLayout(RequestsCampaignPage);
export default RequestsCampaignPageWithLayout;
