import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import $ from 'jquery';

class Ask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askTitle: '',
      askBody: '',
      minExpertRating: 0,
      askPrice: 20,
      redirect: false,
      minimumRating: 0,
      tags: ['']
    };
    this.tabListener = this.tabListener.bind(this);
    this.changeTag = this.changeTag.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.htmlEncode = this.htmlEncode.bind(this);
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  changeTag(e, index) {
    var arr = this.state.tags;
    arr[index] = e.target.value;
    this.setState({
      tags: arr
    });
  }

  tabListener(e) {
    "use strict";
    // pick passed event or global event object if passed one is empty
    e = e || event;
    if (e.keyCode == 9) {
      var currentTags = this.state.tags;
      currentTags.push('');
      this.setState({ tags: currentTags });
    }
  }

  createQuestion(e) {
    e.preventDefault();

    if (this.props.personalInfo.currentCurrency < this.state.askPrice) {
      alert('Sorry, you do not have enough money to make this transaction.');
    } else {
      var currentQuestion = {
        questionTitle: this.state.askTitle,
        questionBody: this.state.askBody,
        username: this.props.username,
        tags: this.state.tags,
        avatar: this.props.personalInfo.avatar_url,
        Messages: []
      };

      this.props.changeIndexProp('currentQuestion', currentQuestion);
      this.props.addQuestion({
        questionTitle: this.state.askTitle,
        questionBody: this.state.askBody,
        username: this.props.username,
        tags: this.state.tags,
        avatar: this.props.personalInfo.avatar_url,
        Messages: []
      });

      var obj = {
        username: this.props.username || 'Oriooctopus',
        title: this.state.askTitle,
        body: this.state.askBody,
        tags: JSON.stringify(this.state.tags),
        price: '-' + this.state.askPrice,
        minExpertRating: this.state.minExpertRating,
      };



      $.ajax({
        type: 'POST',
        url: '/questions',
        data: obj,
        success: (data) => {
          this.props.changeUserCurrency(this.state.askPrice);
          this.setState({
            redirect: true,
            tags: ['']
          })
        },
        error: (err) => {
          console.log('error with submitting answer', err)
        }
      });
    }
  }

  htmlEncode(value) {
      return $('<div />').text(value).html();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/Asked/Recent" />
    }

    return (
      <section className={"ask " + this.props.askDisplayClass}>
        <h1 className="headline" >Ask a Question</h1>
        <form onSubmit={this.createQuestion} >
          <div className="askTitle">
            
            <input className="titleInput" type="text" placeholder="Insert Question Here" value={this.askTitle} onChange={ e => this.changeProp('askTitle', e.target.value) } />
            <br/>
          </div>
          <div className="askParameters">
            <ReactStars
              onChange={ val => this.changeProp('minimumRating', val) }
              size={18}
              value={this.state.minimumRating}
            />
            <div className="setPrice">
              <ReactStars
                onChange={ val => this.changeProp('askPrice', val * 10) }
                char='$'
                size={20}
                value={this.state.askPrice / 10}
              />
              <h2>{this.state.askPrice}</h2>
            </div>
          </div>
          <div className="askBody">
            <textarea onChange={e => this.changeProp('askBody', this.htmlEncode(e.target.value))}/>
            <div>
              <h2>Tags: Press tab to add more</h2>
              { this.state.tags.map((tag, index) => 
                <input className="askTags" onKeyDown={this.tabListener} key={index} value={this.state.tags[index]} onChange={ (e) => this.changeTag(e, index) } />
              )}
            </div>
            <button type="submit">Ask</button>
          </div>
        </form>
      </section>
    )
  }
};

export default Ask;