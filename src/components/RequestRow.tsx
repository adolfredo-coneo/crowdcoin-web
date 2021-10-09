import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

import { Request } from '../model/Campaign';
import CampaingAdd from '../components/CampaignAdd';
import web3 from '../ethereum/web3';

interface Props {
  request: Request;
  index: number;
  handleApprove: (requestId: string) => Promise<void>;
  handleFinalize: (requestId: string) => Promise<void>;
  approversCount: string;
}

const RequestRow: React.FC<Props> = ({
  request,
  index,
  handleApprove,
  handleFinalize,
  approversCount,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFinalize, setLoadingFinalize] = useState<boolean>(false);
  const { Row, HeaderCell } = Table;
  const readyToFinalize =
    parseInt(request.approvalCount) > parseInt(approversCount) / 2;

  const onApprove = async (id: string) => {
    setLoading(true);
    await handleApprove(id);
    setLoading(false);
  };

  const onFinalize = async (id: string) => {
    setLoadingFinalize(true);
    await handleFinalize(id);
    setLoadingFinalize(false);
  };

  return (
    <Row
      key={index}
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <HeaderCell>{index}</HeaderCell>
      <HeaderCell>{request.description}</HeaderCell>
      <HeaderCell>{web3.utils.fromWei(request.value, 'ether')}</HeaderCell>
      <HeaderCell>{request.recipient}</HeaderCell>
      <HeaderCell>{`${request.approvalCount}/${approversCount}`}</HeaderCell>
      <HeaderCell>
        {!request.complete && (
          <CampaingAdd
            description="Approve"
            floated="left"
            onClick={() => onApprove(index.toString())}
            color="green"
            loading={loading}
            basic
          />
        )}
      </HeaderCell>
      <HeaderCell>
        {!request.complete && (
          <CampaingAdd
            description="Finalize"
            floated="left"
            onClick={() => onFinalize(index.toString())}
            color="teal"
            loading={loadingFinalize}
            basic
          />
        )}
      </HeaderCell>
    </Row>
  );
};

export default RequestRow;
