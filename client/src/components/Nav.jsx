import React from 'react';
import Currency from './Currency.jsx';
import { Link } from 'react-router-dom';

const Nav = props => (
  <section className="nav">
    <h1 className="logo">Forum</h1>
    <Currency currency={props.currentCurrency} name="Current"/>
    <Link to="/Ask">Ask a Question</Link>
  </section>
);

export default Nav;
