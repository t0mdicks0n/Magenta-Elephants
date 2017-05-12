import React from 'react';
import Currency from './Currency.jsx';
import { Link } from 'react-router-dom';

const Nav = props => (
  <section className="nav">
    <Link to="/Dashboard"><img className="logo" src="http://i1378.photobucket.com/albums/ah89/aelgiadi/4um_logo_zpst5d7mabo.png" /></Link>
    <Currency currency={props.currentCurrency} name="Current"/>
    <Link to="/Ask">Ask a Question</Link>
  </section>
);

export default Nav;
