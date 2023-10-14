import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { PrismicProvider } from '@prismicio/react'
import { client } from './prismic'

import "./components/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <BrowserRouter>
  <PrismicProvider client={client}>
    <App />
  </PrismicProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
