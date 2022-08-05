import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import '../build/styles/output.css'
import './styles/default.css'

const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);
