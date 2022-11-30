import { Text, createStyles, Button, Center, Loader } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import CustomDiv from "../components/CustomDiv";
import { ReactComponent as BlankSVG } from "../assets/undraw_nothing.svg";

const useStyles = createStyles((theme) => ({
  Title: {
    fontSize: 36,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 36 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 36 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 20,
    },
  },

  pageTitle: {
    fontSize: 28,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 28 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 28 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 16,
    },
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "60%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "70%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "85%",
    },
  },

  button: {
    width: "100%",
    height: 80,
    borderRadius: 20,
    marginTop: 20,
    backgroundImage: "linear-gradient(to right, #FD008C, #7901FF, #0097FF)",
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },
  },

  sidePanel: {
    position: "sticky",
    top: 64,
    display: "flex",
    flexDirection: "column",
    height: window.innerHeight * 0.8,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: 64 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: 64 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
}));

function UpcomingTripsPage() {
  const { classes } = useStyles();
  const [upcomingPosts, setUpcomingPosts] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [pageLoading, setPageLoading] = React.useState(true);

  let navigate = useNavigate();

  React.useEffect(() => {
    const Posts = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/trip/upcoming`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setUpcomingPosts(data.data);
    };
    Posts();

    const User = async () => {
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/user/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setEmail(data.data.email);
    };
    User();
  }, []);

  if (pageLoading && upcomingPosts && email) {
    setPageLoading(false);
  }

  return !pageLoading ? (
    <>
      <Button variant="subtle" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Upcoming Trips</Text>
        {upcomingPosts?.length > 0 ? (
          upcomingPosts?.map((item, id) => (
            <CustomDiv key={id} type={7} item={item} email={email} />
          ))
        ) : (
          <BlankSVG
            width={"40%"}
            height={"40%"}
            style={{
              alignSelf: "center",
              marginTop: "40%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </>
  ) : (
    <Center style={{ width: "100%", height: "100%" }}>
      <Loader />
    </Center>
  );
}

export default UpcomingTripsPage;
