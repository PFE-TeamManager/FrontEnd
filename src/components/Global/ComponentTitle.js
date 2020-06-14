import React from 'react';

export class ComponentTitle extends React.Component {
  render() {
    const {icon,title,introduction} = this.props;

    return (
            <div className="app-title">
                <div>
                    <h1><i className={icon}></i> {title}</h1>
                    <p>{introduction}</p>
                </div>
            </div>
        );
    }
}
          