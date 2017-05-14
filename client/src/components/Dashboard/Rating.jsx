import React from 'react';
import ReactStars from 'react-stars';

const Rating = props => (
  <div className="rating">
    <h1>{props.name} Rating</h1>
    <ReactStars
      size={21}
      edit={false}
      value={props.value}
    />  
  </div>
);

export default Rating;