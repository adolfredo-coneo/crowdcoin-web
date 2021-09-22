import React from 'react';
//import PropTypes from 'prop-types';

import Header from '../Header';

const withLayout = (WrappedComponent: React.FC) => {
  const withLayout = ({ ...props }) => (
    <div>
      <Header />
      <WrappedComponent {...props} />
      <div>Im a Footer</div>
    </div>
  );

  //withLayout.propTypes = {};

  withLayout.displayName = `withLayout(${getDisplayName(WrappedComponent)})`;
  return withLayout;
};

const getDisplayName = (WrappedComponent: React.FC) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withLayout;
