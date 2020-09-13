import React from 'react';
import ReactDOM from 'react-dom';
import WebApplication from './App';

test('renders learn react link', () => {
  const div = document.createElement('div')
  ReactDOM.render(<WebApplication />, div)
  ReactDOM.unmountComponentAtNode(div)
});
