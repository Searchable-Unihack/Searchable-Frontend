import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoRow from './videorow'
class Dropdown extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {videos: [
      {timestamp: 10.10, 'context': 'this is some context'},
      {timestamp: 2000.30, 'context': 'this is another context'}
    ]};

   }


  componentDidMount() {
    console.log('yay it mounted')
  }


  render() {
    const divStyle = {
      position: 'absolute',
      display: 'float',
      backgroundColor: 'white',
      zIndex: 100
    };
    console.log(this.props.content);
    var content;
    if (this.props.content) {
    content = this.props.content.slice(0, 5);
    }
    else {
      content = [];
    }
    return (
      <div style={divStyle}>
        {content.map((suggestion, index) =>
         // Correct! Key should be specified inside the array.
         <VideoRow key={index.toString()}
                   context={suggestion._highlightResult.alternatives[0].transcript.value}
                   timestamp={suggestion.alternatives[0].timestamps[0][1]} />
       )}
      </div>
    );
  }
}

export default Dropdown;
