import React from 'react';
import CurrentPoints from './CurrentPoints.jsx';

const Nav = props => (
  <section className="nav">
    <h1 className="logo">Forum</h1>
    <CurrentPoints currentCurrency={props.currentCurrency} />
  </section>
);

export default Nav;
