import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Card, Grid } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import { getCampaignSummaryHandler } from '../../ethereum/handlers/campaignHandlers';
import { ResponseSummary } from '../../model/Campaign';
import ContributeForm from '../../components/ContributeForm';
import CampaingAdd from '../../components/CampaignAdd';

interface Props {
  address: string;
}

export const ViewCampaignPage: React.FC = () => {
  let { address } = useParams<Props>();
  const [summary, setSummary] = useState<ResponseSummary>(
    {} as ResponseSummary
  );
  const history = useHistory();

  useEffect(() => {
    const getSummary = async () => {
      const summary = await getCampaignSummaryHandler(address);
      setSummary(summary);
    };

    getSummary();
  }, [address]);

  const handleViewRequests = () => {
    history.push(`/campaigns/${address}/requests`);
  };

  return (
    <div>
      <h1>This is the campaign {address}</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group>
              <Card
                header={summary.manager}
                meta="Address of Manager"
                description="The Manager Created this campaign and can create requests."
                style={{ overflowWrap: 'break-word' }}
              />
              <Card
                header={summary.minimumContribution}
                meta="Minimum Contribution (wei)"
                description="You must contribute at least this mucho wei to become an approver."
                style={{ overflowWrap: 'break-word' }}
              />
              <Card
                header={summary.balance}
                meta="Campaign Balance (ether)"
                description="The Balance is how much money this campaign has left to spend."
                style={{ overflowWrap: 'break-word' }}
              />
              <Card
                header={summary.approversCount}
                meta="Number of Approvers"
                description="Number of people who have already donated to this campaign."
                style={{ overflowWrap: 'break-word' }}
              />
              <Card
                header={summary.requestsCount}
                meta="Number of Requests"
                description="A Request tries to withdraw money from the Contract. Requests must be approved by approvers."
                style={{ overflowWrap: 'break-word' }}
              />
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CampaingAdd
              description="View Requests"
              floated="left"
              onClick={handleViewRequests}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const ViewCampaignPageWithLayout = withLayout(ViewCampaignPage);
export default ViewCampaignPageWithLayout;
