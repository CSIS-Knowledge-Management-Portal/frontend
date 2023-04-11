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
import NewEntry from "../pages/NewEntry";
import NewReport from "../pages/NewReport";
import GenReport from "../pages/GenReport";
import BulkUpload from "../pages/BulkUpload";
import NewRecordType from "../pages/NewRecordType";
import AllRecord from "../pages/AllRecord";
import Record from "../pages/Record";
import UpdateRecordType from "../pages/UpdateRecordType";

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
    // margin: 10,
    padding: 0,
  },
}));

function Navigation() {
  const { classes } = useStyles();
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("SavedToken") ? true : false
  );

  const [userDetail, setUserDetail] = React.useState(null);
  const [recordTypes, setRecordTypes] = React.useState(null);
  const [pastTrips, setPastTrips] = React.useState(null);
  const [sentRequests, setSentRequests] = React.useState(null);
  const [recievedRequests, setRecievedRequests] = React.useState(null);

  React.useEffect(() => {
    if (loggedIn) {
      getUserData();
      getRecordTypes();
      getPastTrips();
      getSentRequests();
      getRecievedRequests();
    }
  }, [loggedIn]);

  const getUserData = React.useCallback(
    async (response) => {
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/users/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      console.log(data.data);
      setUserDetail(data.data);
    },
    [userDetail]
  );

  const getRecordTypes = React.useCallback(
    async (response) => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_ROOT_URL}/api/recordtype/`,
          {
            headers: { Authorization: localStorage.getItem("SavedToken") },
          }
        );
        console.log(data.data);
        setRecordTypes(data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    [recordTypes]
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
      recordTypes,
      setRecordTypes,
      pastTrips,
      sentRequests,
      setSentRequests,
      recievedRequests,
      setRecievedRequests,
    }),
    [userDetail, recordTypes, pastTrips, sentRequests, recievedRequests]
  );

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}>
      <BrowserRouter>
        <UserContext.Provider value={contextValue}>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          {loggedIn ? (
            <Grid
              gutter={"xl"}
              columns={12}
              sx={{ minHeight: window.innerHeight - 48 }}
            >
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
                    <Route path="/new-recordtype" element={<NewRecordType />} />
                    <Route
                      path="/update-recordtype"
                      element={<UpdateRecordType />}
                    />
                    <Route path="/all-record" element={<AllRecord />} />
                    <Route path="/all-record" element={<AllRecord />}>
                      <Route path="/all-record:id" element={<AllRecord />} />
                    </Route>
                    <Route path="/record" element={<Record />}>
                      <Route path="/record:id" element={<Record />} />
                    </Route>
                    <Route path="/new-entry" element={<NewEntry />} />
                    <Route path="/new-report" element={<NewReport />} />
                    <Route path="/generate-report" element={<GenReport />} />
                    <Route path="/bulk-upload" element={<BulkUpload />} />
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
