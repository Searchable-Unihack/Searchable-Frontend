import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
// import algoliasearch from 'algoliasearch';

import App from './components/app/App';

const proxyStore = new Store({portName: 'example'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

var pollDom = setInterval(checkDOM, 500);
var i = 0;
function checkDOM() {
  if (i > 20) {
    clearInterval(pollDom);
  }
  if (document.getElementsByClassName("home-header")[0]) {
    document.getElementsByClassName("home-header")[0].appendChild(anchor);
    clearInterval(pollDom);
    render(
      <Provider store={proxyStore}>
        <App/>
      </Provider>
      , document.getElementById('rcr-anchor'));
  }
  else if (document.getElementsByClassName('classroomNav') && document.getElementsByClassName('classroomNav')[0].getElementsByClassName('left')[0]) {
    document.getElementsByClassName('classroomNav')[0].getElementsByClassName('left')[0].appendChild(anchor);
    clearInterval(pollDom);
    render(
      <Provider store={proxyStore}>
        <App/>
      </Provider>
      , document.getElementById('rcr-anchor'));
  }
  i++;
}
