import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import Onboarding from "./Onboarding";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/with-tag"
          element={
            <>
              <Helmet>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
              </Helmet>
              <Onboarding />
            </>
          }
        />
        <Route path="/without-tag" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}
