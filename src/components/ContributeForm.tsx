import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { contributeCampianHandler } from '../ethereum/handlers/campaignHandlers';

interface Props {
  address: string;
}

const ContributeForm: React.FC<Props> = ({ address }) => {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    const result = await contributeCampianHandler(address, amount);
    setMessage(result.message);
    setResult(result.result);
    setLoading(false);

    if (result.result === 'success') {
      history.go(0);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      error={!!message.length}
      success={!!message.length}
    >
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label={{ content: 'ETH' }}
          labelPosition="right"
          placeholder="0.00"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
        />
      </Form.Field>

      {result === 'success' ? (
        <Message success header="Great!" content={message} />
      ) : (
        <Message error header="Error!" content={message} />
      )}
      <Button primary loading={loading} disabled={loading}>
        Contribute
      </Button>
    </Form>
  );
};

export default ContributeForm;
