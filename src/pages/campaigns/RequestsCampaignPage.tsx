import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Table } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import CampaingAdd from '../../components/CampaignAdd';
import { getAllRequestsHandler } from '../../ethereum/handlers/campaignHandlers';
import { Request } from '../../model/Campaign';

interface Props {
  address: string;
}

export const RequestsCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();
  const history = useHistory();
  const { Header, Row, HeaderCell, Body } = Table;
  const [requests, setRequests] = useState<Request[]>([]);

  const handleCreateRequest = () => {
    history.push(`/campaigns/${address}/requests/new`);
  };

  useEffect(() => {
    const getRequests = async () => {
      const response = await getAllRequestsHandler(address);

      if (response.result === 'success') {
        setRequests(response.requests);
      }
    };

    getRequests();
  }, [address, requests]);

  return (
    <div>
      <h3>Requests List</h3>
      <CampaingAdd
        description="Add Request"
        floated="left"
        onClick={handleCreateRequest}
      />
      <br />
      <br />
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => (
            <Row key={index}>
              <HeaderCell>{index}</HeaderCell>
              <HeaderCell>{request.description}</HeaderCell>
              <HeaderCell>{request.value}</HeaderCell>
              <HeaderCell>{request.recipient}</HeaderCell>
              <HeaderCell>{request.approversCount}</HeaderCell>
              <HeaderCell>Aprovers</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};

const RequestsCampaignPageWithLayout = withLayout(RequestsCampaignPage);
export default RequestsCampaignPageWithLayout;
