import React, {Component} from 'react';
import VideoRow from './videorow';
import styled from 'styled-components';

const WrapperHome = styled.section`
	padding: 5px;
  background: white;
  position: fixed;
  z-index: 100;
  margin-left: 220px;
  width: 400px;
  border: 0.01em solid black;
  margin-top: -7px;
`;

const WrapperVideo = styled.section`
	padding: 5px;
  background: white;
  position: fixed;
  z-index: 100;
  margin-left: 6px;
  width: 350px;
  border: 0.01em solid black;
  margin-top: -8px;
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
        <WrapperHome>
              {content.map((suggestion, index) =>
              <VideoRow key={index.toString()}
                        id={suggestion.id}
                        context={suggestion._highlightResult.text.value}
                        timestamp={suggestion.time}
                        page={this.props.page}/>
            )}
        </WrapperHome>
      )
    } else if (this.props.page == "video") {
      return (
        <WrapperVideo>
          {content.map((suggestion, index) =>
          <VideoRow key={index.toString()}
                    id={suggestion.id}
                    context={suggestion._highlightResult.text.value}
                    timestamp={suggestion.time}
                    page={this.props.page}/>
        )}
        </WrapperVideo>
      );
    }
  }
}

export default Dropdown;
