import { createStyles, Grid } from "@mantine/core";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Page404 from "../pages/Page404";
import { UserContext } from "../utils/Context";
import axios from "axios";
import NavMenu from "../components/NavMenu";
import AllReport from "../pages/AllReport";
import ReportDetail from "../pages/ReportDetail";

const useStyles = createStyles((theme) => ({
  navigationwrapper: {
    display: "flex",
    position: "sticky",
    top: 48,
    flexDirection: "column",
    background: theme.colors.customDark[6],
    padding: 0,
    margin: 0,
    width: "100%",
    height: window.innerHeight - 48,
    justifyContent: "center",
    alignItems: "flex-end",

    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "65%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "95%",
    },
  },

  wrapper: {
    margin: 10,
    padding: 0,
  },
}));

function Navigation() {
  const { classes } = useStyles();
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
            <Grid gutter={"xl"} columns={12}>
              <Grid.Col md={3} className={classes.navigationwrapper}>
                <NavMenu />
              </Grid.Col>
              <Grid.Col span={"auto"} className={classes.wrapper}>
                <Container>
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard userDetail={userDetail} />}
                    />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/all-report" element={<AllReport />} />
                    <Route path="/report-detail" element={<ReportDetail />}>
                      <Route
                        path="/report-detail:id"
                        element={<ReportDetail />}
                      />
                    </Route>

                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </Container>
              </Grid.Col>
            </Grid>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                }
              />

              <Route path="*" element={<Page404 />} />
            </Routes>
          )}

          {/* <Footer /> */}
        </UserContext.Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default Navigation;
