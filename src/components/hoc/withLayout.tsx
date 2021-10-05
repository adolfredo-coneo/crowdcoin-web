import React from 'react';
import { Container } from 'semantic-ui-react';
//import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const withLayout = (WrappedComponent: React.FC) => {
  const withLayout = ({ ...props }) => (
    <Container>
      <Header />
      <WrappedComponent {...props} />
      <Footer />
    </Container>
  );

  //withLayout.propTypes = {};

  withLayout.displayName = `withLayout(${getDisplayName(WrappedComponent)})`;
  return withLayout;
};

const getDisplayName = (WrappedComponent: React.FC) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withLayout;
