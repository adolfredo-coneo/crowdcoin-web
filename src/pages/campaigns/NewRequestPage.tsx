import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';
import { createRequest } from '../../ethereum/handlers/campaignHandlers';

interface Props {
  address: string;
}

export const NewRequestPage: React.FC = () => {
  let { address } = useParams<Props>();
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    const result = await createRequest(address, description, value, recipient);
    setMessage(result.message);
    setLoading(false);

    if (result.result === 'success') {
      history.push(`/campaigns/${address}/requests`);
    }
  };

  return (
    <div>
      <Link className="item" to={`/campaigns/${address}/requests`}>
        {'<-'} Back
      </Link>
      <h3>Create a new request {address}</h3>
      <Form onSubmit={submitHandler} error={!!message.length}>
        <Form.Field>
          <label>Description</label>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            placeholder="Value"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            placeholder="recipient"
            value={recipient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRecipient(e.target.value)
            }
          />
        </Form.Field>

        <Message error header="Error!" content={message} />
        <Button primary loading={loading} disabled={loading}>
          Create!
        </Button>
      </Form>
    </div>
  );
};

const NewRequestPageWithLayout = withLayout(NewRequestPage);
export default NewRequestPageWithLayout;
