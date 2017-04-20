import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

ReactDOM.render(
  <Board rows={25} columns={50} />,
  document.getElementById('root')
);
