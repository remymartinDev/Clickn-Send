import React from 'react';
import axios from 'axios';


import CreateFacture from '~/components/Forms/invoice/Create';


class Create extends React.Component {

  render() {
    
    return (
      <React.Fragment>
        <CreateFacture history={this.props.history} />;
        {/* <Modal /> */}
      </React.Fragment>
    );
  }
}

export default Create;
