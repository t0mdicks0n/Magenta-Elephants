import React from 'react';

const Ask = props => (
  <section className={"ask " + props.askDisplayClass}>
    <h1 className="headline" >Ask a Question</h1>
    <form onSubmit={props.createQuestion} >
      <div className="askTitle">
        <label>Title:</label>
        <input className="titleInput" type="text" placeholder="Insert Question Here" value={props.askTitle} onChange={ e => props.changeProp('askTitle', e.target.value) } />
        <br/>
      </div>
      <div className="askBody">
        <textarea className="questionDescription" placeholder="Paste Code Here" value={props.askBody} onChange={ e => props.changeProp('askBody', e.target.value) } ></textarea>
        <button type="submit">Ask</button>
      </div>
    </form>
  </section>
);

export default Ask;