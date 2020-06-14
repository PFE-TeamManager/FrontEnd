import React from 'react';

class ActiveFormatter extends React.Component {
    render() {
      return (
        <input type='checkbox' checked={ this.props.active }/>
      );
    }
}

export default ActiveFormatter; 