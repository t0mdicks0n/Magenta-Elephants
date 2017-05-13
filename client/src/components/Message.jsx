import React from 'react';

const Message = props => (
  <div className="message">
    <h1>{props.message.msg}</h1>
  </div>
);

export default Message;