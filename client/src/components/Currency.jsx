import React from 'react';

const Currency = props => (
  <div className="currentPoints">
    <h2>{props.name} Currency</h2>
    <h1>{props.currency}</h1>
  </div>
);

export default Currency;