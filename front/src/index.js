import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import store from "./redux/store.js";

import App from "./App.jsx";

ReactDOM.render(    
  <Provider store={store}><App/></Provider>,
      document.getElementById('root')
    );