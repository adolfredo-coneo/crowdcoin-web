import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Button, Form, Input } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';

interface Props {
  address: string;
}

export const NewRequestPage: React.FC = () => {
  let { address } = useParams<Props>();
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    history.push(`/campaigns/${address}/requests`);
  };

  return (
    <div>
      <h3>Create a new request {address}</h3>
      <Form onSubmit={submitHandler}>
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
          <label>Valuein Ether</label>
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
        <Button primary type="submit">
          Create!
        </Button>
      </Form>
    </div>
  );
};

const NewRequestPageWithLayout = withLayout(NewRequestPage);
export default NewRequestPageWithLayout;
