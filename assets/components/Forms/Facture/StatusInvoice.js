
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