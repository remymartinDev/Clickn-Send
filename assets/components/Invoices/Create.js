import React from 'react';
import PropTypes from 'prop-types';

import CreateFacture from '~/components/Forms/invoice/Create';
import Modal from './componentsInvoices/Modal';

// class Create extends React.Component {

// creatInvoice = (values) => {
//   console.log('insubmit invoice', values);
// axios.post('/api/invoice/new', values)
//   .then((response) => {
//     console.log(response.data);
//   });
// }

//   render() {
//     return (
//       <React.Fragment>
//         <CreateFacture onSubmit={this.props.createInvoice} />;
//         <Modal />
//       </React.Fragment>
//     );
//   }
// }

const Create = ({ createInvoice }) => (
  <React.Fragment>
    <CreateFacture onSubmit={createInvoice} />;
    <Modal />
  </React.Fragment>
);

Create.propTypes = {
  createInvoice: PropTypes.func.isRequired,
};

export default Create;
