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
import { GoogleOAuthProvider } from "@react-oauth/google";

function Navigation() {
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("SavedToken") ? true : false
  );

  React.useEffect(() => {}, [loggedIn]);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        {loggedIn ? (
          <Container>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/posts" element={<Homepage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="choose-vendor" element={<ChooseVendorPage />} />
              <Route path="my-account" element={<MyAccountPage />} />
              <Route path="past-trips" element={<PastTripsPage />} />
              <Route path="upcoming-trips" element={<UpcomingTripsPage />} />
              <Route
                path="pending-approval"
                element={<PendingApprovalPage />}
              />
              <Route
                path="/request-approval"
                element={<RequestApprovalPage />}
              />
              <Route path="/post-details" element={<TripDetail />}>
                <Route path="/post-details:id" element={<TripDetail />} />
              </Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Container>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              }
            />

            <Route
              path="/request-approval"
              element={
                <Container>
                  <RequestApprovalPage />
                </Container>
              }
            />
            <Route path="/post-details" element={<TripDetail />}>
              <Route
                path="/post-details:id"
                element={
                  <Container>
                    <TripDetail />
                  </Container>
                }
              />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        )}

        <CreatePostButton />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default Navigation;
