import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { client } from "./ApolloConfig";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*Go to the command palette CTRL+Shift+P.
Choose "TypeScript: Select a TypeScript Version...".
Choose "Use workspace Version". */
