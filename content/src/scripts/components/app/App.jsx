import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.skipToTime = this.skipToTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
     this.setState({value: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
     this.skipToTime(this.state.value)
   }

  componentDidMount() {
    console.log('yay it mounted')
  }
  skipToTime() {
    document.getElementsByTagName('video')[0].currentTime = this.state.value;
    document.getElementsByTagName('video')[1].currentTime = this.state.value;
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(App);
