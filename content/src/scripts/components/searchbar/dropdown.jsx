import React, {Component} from 'react';
import VideoRow from './videorow';
import styled from 'styled-components';

const Wrapper1 = styled.section`
	padding: 0.5em;
  background: white;
  position: relative;
  z-index: 100;
  margin-left: 19em;
  width: 35em;
  border: 0.01em solid black;
`;

const Wrapper2 = styled.section`
	padding: 0.5em;
  background: white;
  position: relative;
  z-index: 100;
  margin-left: 0.4em;
  width: 9em;
  border: 0.01em solid black;
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.props.page;
   }


  render() {
    var content;
    if (this.props.content) {
    content = this.props.content.slice(0, 5);
    }
    else {
      content = [];
    }

    if (this.props.page == "home") {
      return(
        <Wrapper1>
              {content.map((suggestion, index) =>
              <VideoRow key={index.toString()}
                        id={suggestion.id}
                        context={suggestion._highlightResult.text.value}
                        timestamp={suggestion.time}
                        page={this.props.page}/>
            )}
        </Wrapper1>
      )
    } else if (this.props.page == "video") {
      return (
        <Wrapper2>
          {content.map((suggestion, index) =>
          <VideoRow key={index.toString()}
                    id={suggestion.id}
                    context={suggestion._highlightResult.text.value}
                    timestamp={suggestion.time}
                    page={this.props.page}/>
        )}
        </Wrapper2>
      );
    }
  }
}

export default Dropdown;
