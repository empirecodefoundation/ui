import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { MainHome } from "../pages/MainHome";
import { Home } from "../pages/Home";
import { Documentation } from "../pages/Documentation";

// Route configuration
export const routes = {
  home: {
    path: "/",
    element: <MainHome />,
  },
  aiTools: {
    path: "/ai-tools/*",
    element: <Home />,
  },
  docs: {
    path: "/docs",
    element: <Documentation />,
  },
  // Add more routes here as needed
} as const;

// Redirects configuration
export const redirects = [
  {
    from: "/chat",
    to: "/ai-tools",
  },
  // Add more redirects here as needed
] as const;

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirects */}
      {redirects.map((redirect) => (
        <Route
          key={redirect.from}
          path={redirect.from}
          element={<Navigate to={redirect.to} replace />}
        />
      ))}

      {/* Main Routes */}
      <Route
        path={routes.home.path}
        element={<MainLayout>{routes.home.element}</MainLayout>}
      />
      <Route
        path={routes.aiTools.path}
        element={<MainLayout>{routes.aiTools.element}</MainLayout>}
      />
      <Route
        path={routes.docs.path}
        element={<MainLayout>{routes.docs.element}</MainLayout>}
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
