import React, {Component} from 'react';
import styled from 'styled-components';

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
  background: -webkit-linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 0.15px;
  -webkit-text-stroke-color: black;
`;


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title>
          Searchable
        </Title>
      </div>
    );
  }
}

export default App;
