import { Affix, Button } from "@mantine/core";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Container from "../components/Container";
import CreatePostButton from "../components/CreatePostButton";
import Navbar from "../components/Navbar";
import ChooseVendorPage from "../pages/ChooseVendorPage";
import CreatePostPage from "../pages/CreatePostPage";
import Dashboard from "../pages/Dashboard";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/LandingPage";
import MyAccountPage from "../pages/MyAccountPage";
import PastTripsPage from "../pages/PastTripsPage";
import PendingApprovalPage from "../pages/PendingApprovalPage";
import RequestApprovalPage from "../pages/RequestApprovalPage";
import TripDetail from "../pages/TripDetail";
import UpcomingTripsPage from "../pages/UpcomingTripsPage";

function Navigation() {
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("SavedToken") ? true : false
  );

  React.useEffect(() => {}, [loggedIn]);
  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              !loggedIn ? <Navigate replace to="/landing" /> : <Dashboard />
            }
          />
          <Route
            path="/landing"
            element={loggedIn ? <Navigate replace to="/" /> : <LandingPage />}
          />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="choose-vendor" element={<ChooseVendorPage />} />
          <Route path="my-account" element={<MyAccountPage />} />
          <Route path="past-trips" element={<PastTripsPage />} />
          <Route path="upcoming-trips" element={<UpcomingTripsPage />} />
          <Route path="pending-approval" element={<PendingApprovalPage />} />
          <Route path="/request-approval" element={<RequestApprovalPage />} />
          <Route path="/post-details" element={<TripDetail />}>
            <Route path="/post-details:id" element={<TripDetail />} />
          </Route>
        </Routes>
      </Container>
      <CreatePostButton />
    </BrowserRouter>
  );
}

export default Navigation;
