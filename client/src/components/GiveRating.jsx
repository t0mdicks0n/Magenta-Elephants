import React from 'react';
import ReactStars from 'react-stars';
import $ from 'jquery';

class GiveRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0
    };
    this.changeStars = this.changeStars.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  changeStars(value) {
    this.setState({ stars: value });
  }

  submitRating() {
    var obj = (this.props.role === 'expert') ? {noviceRating: this.state.stars} : {expertRating: this.state.stars};
    obj.questionId = this.props.questionId;

    $.ajax({
      type: 'PUT',
      url: '/questions',
      data: obj,
      err: (err) => {
        console.log('error!');
      }
    });
    this.props.changeProp('ratingVisible', false);
  }

  render() {
    if (this.props.ratingVisible) {
      if (this.props.role === 'expert') {
        return (
          <div>
            <h1>Please rate quality of the question</h1>
            <ReactStars onChange={this.changeStars} value={this.state.stars} /> 
            <button onClick={this.submitRating} >Submit</button>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Please rate the quality of the answer you were given</h1>
            <ReactStars onChange={this.changeStars} value={this.state.stars} />
            <button onClick={this.submitRating} >Submit</button>
          </div>
        )
      }
    } else {
      return (<h1></h1>)
    }
  }
}

export default GiveRating;