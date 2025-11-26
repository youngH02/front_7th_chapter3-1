import React from "react";
import Header from "./components/layout/Header";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/components.css";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
