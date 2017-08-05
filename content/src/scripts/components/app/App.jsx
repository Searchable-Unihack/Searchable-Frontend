import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from '../searchbar/dropdown'
import styled from 'styled-components';

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;

const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
     this.setState({value: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
   }

  componentDidMount() {
    console.log('yay it mounted')
  }

  render() {
    return (
      <div>
        <form autocomplete="off" onSubmit={this.handleSubmit}>
          <label>
            <Title>
              Searchable
            </Title>
            
            <Input placeholder="@mxstbr" type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <Dropdown/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(App);
