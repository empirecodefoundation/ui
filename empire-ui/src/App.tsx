import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { LoadingProvider } from "./contexts/LoadingContext";

export const App: React.FC = () => {
  return (
    <Router>
      <LoadingProvider>
        <AppRoutes />
      </LoadingProvider>
    </Router>
  );
};
