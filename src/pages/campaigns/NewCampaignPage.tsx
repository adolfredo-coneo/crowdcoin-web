import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

export const NewCampaignPage = () => {
  const [minimumContribution, setMinimumContribution] = useState<string>('');

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(minimumContribution).send({
      from: accounts[0],
    });
  };

  return (
    <div>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmitHandler}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder="10"
            value={minimumContribution}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMinimumContribution(e.target.value)
            }
          />
        </Form.Field>

        <Button primary>Create!</Button>
      </Form>
    </div>
  );
};

const NewCampaignPageWithLayout = withLayout(NewCampaignPage);
export default NewCampaignPageWithLayout;
