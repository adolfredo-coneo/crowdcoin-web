import React from 'react';
import { Table } from 'semantic-ui-react';

import { Request } from '../model/Campaign';
import CampaingAdd from '../components/CampaignAdd';
import web3 from '../ethereum/web3';

interface Props {
  request: Request;
  index: number;
  handleApprove: (requestId: string) => void;
  handleFinalize: (requestId: string) => void;
  approversCount: string;
}

const RequestRow: React.FC<Props> = ({
  request,
  index,
  handleApprove,
  handleFinalize,
  approversCount,
}) => {
  const { Row, HeaderCell } = Table;

  return (
    <Row key={index}>
      <HeaderCell>{index}</HeaderCell>
      <HeaderCell>{request.description}</HeaderCell>
      <HeaderCell>{web3.utils.fromWei(request.value, 'ether')}</HeaderCell>
      <HeaderCell>{request.recipient}</HeaderCell>
      <HeaderCell>{`${request.approvalCount}/${approversCount}`}</HeaderCell>
      <HeaderCell>
        <CampaingAdd
          description="Approve"
          floated="left"
          onClick={() => handleApprove(index.toString())}
          color="green"
          basic
        />
      </HeaderCell>
      <HeaderCell>
        <CampaingAdd
          description="Finalize"
          floated="left"
          onClick={() => handleFinalize(index.toString())}
          color="red"
          basic
        />
      </HeaderCell>
    </Row>
  );
};

export default RequestRow;
