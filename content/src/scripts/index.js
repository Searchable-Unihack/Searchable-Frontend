import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
// import algoliasearch from 'algoliasearch';

import App from './components/app/App';

const proxyStore = new Store({portName: 'example'});
// const client = algoliasearch("ITN7Y46FJT", "0f49b009fc84f5df9532d7930fcc0d80");
// const index = client.initIndex('searchable');

console.log('hi');


// index.search('regression', function searchDone(err, content) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//
//   for (var h in content.hits) {
//     console.log('Hit(' + content.hits[h].objectID + '): ' + JSON.stringify(content.hits[h]));
//   }
// });


const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
const searchBar = document.getElementsByClassName('classroomNav')[0].getElementsByClassName('left')[0];
searchBar.appendChild(anchor);

render(
  <Provider store={proxyStore}>
    <App/>
  </Provider>
  , document.getElementById('rcr-anchor'));
