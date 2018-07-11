<<<<<<< HEAD

import axios from axios
import React from 'react';
import { Field } from 'react-form';
import axios from 'axios';

class StatusInvoice extends React.Component {

  state = {
    status: [],
  }
  componentDidMount() {
    axios.get('/api/status')
      .then(({data: status}) => {
        this.setState({
          status,          
        })        
      }            
  }

  getStatusJSX = () => (
    return this.state.status.map(oneStatus => (
      <option ></option>      
    ))    
  )          
  
  render() {
    return (
      <Field component="select" name="status">
        <option>Statut</option>
      </Field>
    )    
  }  
      
}

export default StatusInvoice;
=======
import React from 'react';
import Axios from 'axios';
import { Field } from 'redux-form';

class StatusInvoice extends React.Component {
  state = {
    status: [],
  }

  componentDidMount() {
    Axios.get('/api/status')
      .then(({ data: status }) => {
        this.setState({
          status,
        });
      });
    this.getStatusJSX();
  }

  getStatusJSX = () => (
    this.state.status.map(({ id, invoiceStatus }) => (
      <option key={id}>{invoiceStatus}</option>
    ))
  )

  render() {
    return (
      <Field component="select">
        {this.getStatusJSX}
      </Field>
    );
  }
}

export default StatusInvoice;
>>>>>>> 20b0c0578e3de9e16d7e94e835b7c573e052d48d
