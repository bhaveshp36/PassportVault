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

const AuthenticatedDashboard = withAuth(Dashboard);
const AuthenticatedMembers = withAuth(Members);
const AuthenticatedTravelPlans = withAuth(TravelPlans);
const AuthenticatedFiles = withAuth(Files);
const AuthenticatedSettings = withAuth(Settings);
const AuthenticatedViewMember = withAuth(ViewMember);
const AuthenticatedViewTravelPlan = withAuth(ViewTravelPlan);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <LayoutComponent>
              <AuthenticatedDashboard />
            </LayoutComponent>
          }
        />
        <Route
          path="/members"
          element={
            <LayoutComponent>
              <AuthenticatedMembers />
            </LayoutComponent>
          }
        />
        <Route
          path="/travel-plan"
          element={
            <LayoutComponent>
              <AuthenticatedTravelPlans />
            </LayoutComponent>
          }
        />
        <Route
          path="/files"
          element={
            <LayoutComponent>
              <AuthenticatedFiles />
            </LayoutComponent>
          }
        />
        <Route
          path="/settings"
          element={
            <LayoutComponent>
              <AuthenticatedSettings />
            </LayoutComponent>
          }
        />
        <Route
          path="/members/:id"
          element={
            <LayoutComponent>
              <AuthenticatedViewMember />
            </LayoutComponent>
          }
        />
        <Route
          path="/travel-plan/:id"
          element={
            <LayoutComponent>
              <AuthenticatedViewTravelPlan />
            </LayoutComponent>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
