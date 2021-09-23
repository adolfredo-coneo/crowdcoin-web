import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import withLayout from '../../components/hoc/withLayout';

interface Props {}

export const NewCampaignPage = (props: Props) => {
  return (
    <div>
      <h3>Create a Campaign</h3>

      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <input placeholder="Product" />
        </Form.Field>

        <Button primary>Create!</Button>
      </Form>
    </div>
  );
};

const NewCampaignPageWithLayout = withLayout(NewCampaignPage);
export default NewCampaignPageWithLayout;
