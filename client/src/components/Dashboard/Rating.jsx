import React from 'react';
import ReactStars from 'react-stars';

const Rating = props => (
  <div className="rating">
    <h2>{props.name} Rating</h2>
    <ReactStars
      size={18}
      edit={false}
      value={props.value}
    />  
  </div>
);

export default Rating;