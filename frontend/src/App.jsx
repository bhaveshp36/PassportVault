/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import withAuth from "./withAuth.jsx";

import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LayoutComponent from "./components/Layout.jsx";
import Members from "./components/Members.jsx";
import TravelPlans from "./components/TravelPlans.jsx";
import Files from "./components/Files.jsx";
import Settings from "./components/Settings.jsx";
import ViewMember from "./components/modals/view/ViewMember.jsx";
import ViewTravelPlan from "./components/modals/view/ViewTravelPlan.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route
          path="/members"
          element={
            <LayoutComponent>
              <Members />
            </LayoutComponent>
          }
        />
        <Route
          path="/travel-plan"
          element={
            <LayoutComponent>
              <TravelPlans />
            </LayoutComponent>
          }
        />
        <Route
          path="/files"
          element={
            <LayoutComponent>
              <Files />
            </LayoutComponent>
          }
        />
        <Route
          path="/settings"
          element={
            <LayoutComponent>
              <Settings />
            </LayoutComponent>
          }
        />
        <Route
          path="/members/:id"
          element={
            <LayoutComponent>
              <ViewMember />
            </LayoutComponent>
          }
        />
        <Route
          path="/travel-plan/:id"
          element={
            <LayoutComponent>
              <ViewTravelPlan />
            </LayoutComponent>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
