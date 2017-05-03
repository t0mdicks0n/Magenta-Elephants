import React from 'react';

const Ask = props => (
  <section className="ask">
    <h1 className="headline" >Ask a Question</h1>
    <form>
      <input type="text" defaultValue="Insert Question Here"></input> <br/>
      <input type="text" defaultValue="Paste Code Here"></input> <br/>
      <button type="submit">Ask</button>
    </form>
  </section>
);

export default Ask;