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
import PastTripsPage from "../pages/PastTripsPage";
import PendingApprovalPage from "../pages/PendingApprovalPage";
import RequestApprovalPage from "../pages/RequestApprovalPage";
import TripDetail from "../pages/TripDetail";
import UpcomingTripsPage from "../pages/UpcomingTripsPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Page404 from "../pages/Page404";
import Footer from "../components/Footer";
import { UserContext } from "../utils/Context";
import axios from "axios";

function Navigation() {
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("SavedToken") ? true : false
  );

  const [userDetail, setUserDetail] = React.useState(null);
  const [upcomingTrips, setUpcomingTrips] = React.useState(null);
  const [pastTrips, setPastTrips] = React.useState(null);
  const [sentRequests, setSentRequests] = React.useState(null);
  const [recievedRequests, setRecievedRequests] = React.useState(null);

  React.useEffect(() => {
    if (loggedIn) {
      getUserData();
      getupcomingTrips();
      getPastTrips();
      getSentRequests();
      getRecievedRequests();
    }
  }, [loggedIn]);

  const getUserData = React.useCallback(
    async (response) => {
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/user/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setUserDetail(data.data);
    },
    [userDetail]
  );

  const getupcomingTrips = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/trip/upcoming`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setUpcomingTrips(data.data);
      data.data?.map(async (item) => {
        if (new Date(item.departure_date) < new Date()) {
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_ROOT_URL}/api/trip/done`,
            headers: { Authorization: localStorage.getItem("SavedToken") },
            data: {
              trip_id: item.id,
            },
          });
        }
      });
    },
    [upcomingTrips]
  );

  const getPastTrips = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/trip/past`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setPastTrips(data.data);
    },
    [pastTrips]
  );

  const getSentRequests = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/request/all-sent`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setSentRequests(data.data);
    },
    [sentRequests]
  );

  const getRecievedRequests = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/request/all-received`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setRecievedRequests(data.data);
    },
    [recievedRequests]
  );

  const contextValue = React.useMemo(
    () => ({
      userDetail,
      upcomingTrips,
      setUpcomingTrips,
      pastTrips,
      sentRequests,
      setSentRequests,
      recievedRequests,
      setRecievedRequests,
    }),
    [userDetail, upcomingTrips, pastTrips, sentRequests, recievedRequests]
  );

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}>
      <BrowserRouter>
        <UserContext.Provider value={contextValue}>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

          {loggedIn ? (
            <Container>
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard userDetail={userDetail} />}
                />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/posts" element={<Homepage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/choose-vendor" element={<ChooseVendorPage />} />
                <Route path="/past-trips" element={<PastTripsPage />} />
                <Route path="/upcoming-trips" element={<UpcomingTripsPage />} />
                <Route
                  path="/pending-approval"
                  element={<PendingApprovalPage />}
                />
                <Route
                  path="/request-approval"
                  element={<RequestApprovalPage />}
                />
                <Route path="/post-details" element={<TripDetail />}>
                  <Route path="/post-details:id" element={<TripDetail />} />
                </Route>
                <Route path="*" element={<Page404 />} />
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
              <Route path="*" element={<Page404 />} />
            </Routes>
          )}

          <CreatePostButton />
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default Navigation;
