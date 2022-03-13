import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';

ReactDOM.render(    
  <Provider ><App/></Provider>,
      document.getElementById('root')
    );