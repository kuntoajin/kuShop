import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./app";
import '../build/styles/output.css'
import './styles/default.css'

const container = document.querySelector("#root")!;
const root = createRoot(container);

Sentry.init({
  dsn: "https://d55867960f8f4b66921869b0e415fff0@o569759.ingest.sentry.io/6752306",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

root.render(  
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
