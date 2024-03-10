/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from './components/Dashboard.jsx'; // import your Dashboard component
// import Members from './components/Members.jsx'; // import your Members component
import Layout from "./components/Layout.jsx"; // import your Layout component

function App() {
  return (
    <Router>
      <Layout />
      {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element = {<Members/>} />
      </Routes> */}
    </Router>
  );
}

export default App;
