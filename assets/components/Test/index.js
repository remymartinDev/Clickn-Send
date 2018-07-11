import React from 'react';
import axios from 'axios';

class Test extends React.Component {
  state = {
    response: null,
  }

  componentDidMount() {
    axios.get('/invoice/1/pdf')
      .then((response) => {
        console.log(response);
        this.setState({
          response: response.data,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: this.state.response }} />
      </React.Fragment>
    );
  }
}

export default Test;
