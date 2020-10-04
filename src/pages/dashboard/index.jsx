import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Dashboard({ dashboard }) {
  return <div>hello {dashboard.name}</div>;
}

export default connect(({ dashboard, app }) => ({ dashboard, app }))(Dashboard);
