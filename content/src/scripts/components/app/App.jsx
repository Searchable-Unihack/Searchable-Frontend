import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from '../searchbar/dropdown'
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

const Input = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Bree+Serif');
  font-family: 'Bree Serif', serif;
  font-size: 14px;
  padding: 0.5em;
  padding-right: 20em;
	margin: 0.5em;
	color: black;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 25%);
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
            {/* <Title>
              Searchable
            </Title> */}

            <Input placeholder="Search something..." type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
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
