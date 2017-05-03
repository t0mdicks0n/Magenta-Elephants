import React from 'react';
import {render} from 'react-dom';
import Nav from './components/Nav.jsx';
import RecentQuestions from './components/RecentQuestions.jsx';
import Ask from './components/Ask.jsx';
// require('style-loader');
require("!style-loader!css-loader!sass-loader!./sass/all.scss");

class App extends React.Component {
  render() {
    return (
      <main>
        <Nav />
        <RecentQuestions />
        <Ask />
      </main>
    )
  }
}

render(<App/>, document.getElementById('app'));