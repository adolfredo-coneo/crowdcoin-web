import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import { createCampaignHandler } from '../../ethereum/handlers/factoryHandlers';

export const NewCampaignPage = () => {
  const [minimumContribution, setMinimumContribution] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    const result = await createCampaignHandler(minimumContribution);
    setMessage(result.message);
    setResult(result.result);
    setLoading(false);

    if (result.result === 'success') {
      history.push('/');
    }
  };

  return (
    <div>
      <h3>Create a Campaign</h3>

      <Form
        onSubmit={onSubmitHandler}
        error={!!message.length}
        success={!!message.length}
      >
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

        {result === 'success' ? (
          <Message success header="Great!" content={message} />
        ) : (
          <Message error header="Error!" content={message} />
        )}
        <Button primary loading={loading} disabled={loading}>
          Create!
        </Button>
      </Form>
    </div>
  );
};

const NewCampaignPageWithLayout = withLayout(NewCampaignPage);
export default NewCampaignPageWithLayout;
