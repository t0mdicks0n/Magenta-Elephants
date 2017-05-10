import React from 'react';

const CurrentPoints = props => (
  <div className="currentPoints">
    <h2>Current Points</h2>
    <h1>{props.currentCurrency}</h1>
  </div>
);

export default CurrentPoints;