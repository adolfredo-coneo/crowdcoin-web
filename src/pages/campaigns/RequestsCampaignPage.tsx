import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Table } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import CampaingAdd from '../../components/CampaignAdd';
import RequestRow from '../../components/RequestRow';
import {
  getAllRequestsHandler,
  getApproversCountHandler,
} from '../../ethereum/handlers/campaignHandlers';
import { Request } from '../../model/Campaign';

interface Props {
  address: string;
}

export const RequestsCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();
  const history = useHistory();
  const { Header, Row, HeaderCell, Body } = Table;
  const [requests, setRequests] = useState<Request[]>([]);
  const [approversCount, setApproversCount] = useState<string>('');

  const handleCreateRequest = () => {
    history.push(`/campaigns/${address}/requests/new`);
  };

  useEffect(() => {
    const getRequests = async () => {
      const response = await getAllRequestsHandler(address);
      const approvers = await getApproversCountHandler(address);
      setApproversCount(approvers.message);

      if (response.result === 'success') {
        setRequests(response.requests);
      }
    };

    getRequests();
  }, [address, requests]);

  const handleApproveRequest = (requestId: string) => {
    console.log(requestId);
  };

  const handleFinlizeRequest = (requestId: string) => {
    console.log(requestId);
  };

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
            <RequestRow
              index={index}
              request={request}
              handleApprove={handleApproveRequest}
              handleFinalize={handleFinlizeRequest}
              approversCount={approversCount}
            />
          ))}
        </Body>
      </Table>
    </div>
  );
};

const RequestsCampaignPageWithLayout = withLayout(RequestsCampaignPage);
export default RequestsCampaignPageWithLayout;
