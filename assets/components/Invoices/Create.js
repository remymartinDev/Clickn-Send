import React from 'react';
import PropTypes from 'prop-types';

import CreateFacture from '~/components/Forms/invoice/Create';

const Create = ({ createInvoice }) => (
  <React.Fragment>
    <CreateFacture onSubmit={createInvoice} />;
    {/* <Modal /> */}
  </React.Fragment>
);

Create.propTypes = {
  createInvoice: PropTypes.func.isRequired,
};

export default Create;
