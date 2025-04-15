import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./components/LayoutPage";
import HomePage from "./pages/HomPage";
import UserPage from "./pages/UserPage";
// import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
