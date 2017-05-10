import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askTitle: '',
      askBody: '',
      askPrice: 20,
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.changeProp = this.changeProp.bind(this);
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  createQuestion(e) {
    e.preventDefault();

    var currentQuestion = {
      questionTitle: this.state.askTitle,
      questionBody: this.state.askBody
    };

    var obj = {
      username: this.username || 'oriooctopus',
      title: this.state.askTitle,
      body: this.state.askBody,
      price: '-' + this.state.askPrice
    };

    $.ajax({
      type: 'POST',
      url: '/questions',
      data: obj,
      success: (data) => {
        this.props.changeCurrency(this.state.askPrice);
        this.setState({
          currentQuestion: currentQuestion,
          redirect: true
        });
      },
      error: (err) => {
        console.log('error with submitting answer', err)
      }
    })
  }

  render() {
    if (this.props.redirect) {
      return <Redirect push to="/Asked/Recent" />
    }

    return (
      <section className={"ask " + this.props.askDisplayClass}>
        <h1 className="headline" >Ask a Question</h1>
        <form onSubmit={this.createQuestion} >
          <div className="askTitle">
            <label>Title:</label>
            <input className="titleInput" type="text" placeholder="Insert Question Here" value={this.askTitle} onChange={ e => this.changeProp('askTitle', e.target.value) } />
            <br/>
          </div>
          <div className="askBody">
            <textarea className="questionDescription" placeholder="Paste Code Here" value={this.askBody} onChange={ e => this.changeProp('askBody', e.target.value) } ></textarea>
            <button type="submit">Ask</button>
          </div>
        </form>
      </section>
    )
  }
};


export default Ask;