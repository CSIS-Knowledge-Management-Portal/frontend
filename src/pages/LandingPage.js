import {
  Text,
  createStyles,
  Grid,
  Button,
  Header,
  Title,
  BackgroundImage,
  Center,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import CustomDiv from "../components/CustomDiv";
import BG from "../assets/bg.jpg";
import { GoogleLogin } from "@react-oauth/google";

const useStyles = createStyles((theme) => ({
  Textbox: {
    height: window.innerHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  Title: {
    fontSize: 44,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 44 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 44 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 28,
    },
  },

  SubTitle: {
    fontSize: 36,
    fontWeight: 300,
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

  ButtonGroup: {
    marginTop: 30,
  },

  Button: {
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

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 70,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 60,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 50,
    },
  },

  BG: {
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: "black",
    position: "absolute",
    opacity: 0.4,
    filter: "blur(5px)",
    WebkitFilter: "blur(5px)",
    zIndex: -1,
  },
}));

function LandingPage({ loggedIn, setLoggedIn }) {
  const { classes } = useStyles();

  const Login = async (response) => {
    console.log("response", response);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${process.env.REACT_APP_ROOT_URL}/user/auth`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("credential=" + response.credential);
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText);
      console.log("Signed in as: ", data);
      localStorage.setItem("SavedToken", "Bearer " + data.token);
      setLoggedIn(true);
    };
  };

  React.useEffect(() => {}, [loggedIn]);

  return (
    <>
      <BackgroundImage src={BG} className={classes.BG} />
      <div className={classes.Textbox}>
        <Title order={1} color="#fff" className={classes.Title}>
          Travel@BPHC
        </Title>
        <Title order={2} color="#fff" className={classes.SubTitle}>
          Travelling together was never simpler!
        </Title>
        <Button.Group className={classes.ButtonGroup}>
          <GoogleLogin
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}
            theme="dark"
            // render={(renderProps) => (
            //   <Button variant="outline" onClick={renderProps.onClick}>
            //     Login with BITS Mail
            //   </Button>
            // )}
            buttonText="Login"
            onSuccess={(credentialResponse) => {
              Login(credentialResponse);
            }}
            onFailure={Login}
          />
        </Button.Group>
      </div>
    </>
  );
}

export default LandingPage;
