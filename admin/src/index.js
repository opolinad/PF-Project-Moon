import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeProvider } from "./context/darkModeContext";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
