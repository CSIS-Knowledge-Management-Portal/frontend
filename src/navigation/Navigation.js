import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import ChooseVendorPage from "../pages/ChooseVendorPage";
import CreatePostPage from "../pages/CreatePostPage";
import Homepage from "../pages/Homepage";
import MyAccountPage from "../pages/MyAccountPage";
import PastTripsPage from "../pages/PastTripsPage";
import PendingApprovalPage from "../pages/PendingApprovalPage";
import UpcomingTripsPage from "../pages/UpcomingTripsPage";

function Navigation() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="choose-vendor" element={<ChooseVendorPage />} />
          <Route path="my-account" element={<MyAccountPage />} />
          <Route path="past-trips" element={<PastTripsPage />} />
          <Route path="upcoming-trips" element={<UpcomingTripsPage />} />
          <Route path="pending-approval" element={<PendingApprovalPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Navigation;
