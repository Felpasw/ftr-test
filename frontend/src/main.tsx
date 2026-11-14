import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./app";
import { apolloClient } from "./services/apolloClient";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("root element não encontrado");

createRoot(container).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
