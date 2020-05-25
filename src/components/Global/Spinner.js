import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div className="card mb-3 mt-3 shadow-sm w-100">
        <div className="card-body text-center">
          <i className="fa fa-spinner fa-spin"/>
        </div>
      </div>
    );
  }
}