import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {

    const{
      isStart,
      isFinish,
    } = this.props;

    const extraClassName = isFinish
    ? 'node-Finish'
    : isStart
    ? 'node-Start'
    : '';

    return (
      <div className={`node ${extraClassName}`}></div>
    );
  }
}
