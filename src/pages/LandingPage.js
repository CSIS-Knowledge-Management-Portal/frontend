import {
  createStyles,
  Button,
  Title,
  BackgroundImage,
  Image,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import BG from "../assets/bg.jpg";
import logo from "../assets/bits-logo.png";
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
    marginTop: 20,
    fontSize: 44,
    textAlign: "center",
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

  wrapper: {
    backgroundColor: "#000000",
    opacity: 0.99,
  },

  BG: {
    height: window.innerHeight,
    width: window.innerWidth,
    position: "absolute",
    opacity: 0.5,
    filter: "blur(5px)",
    WebkitFilter: "blur(5px)",
    zIndex: -1,
  },
}));

function LandingPage({ loggedIn, setLoggedIn }) {
  const { classes } = useStyles();

  //Login function for Google OAuth
  const Login = async (response) => {
    console.log("response", response);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${process.env.REACT_APP_ROOT_URL}/users/auth`);
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
    <div className={classes.wrapper}>
      <BackgroundImage src={BG} className={classes.BG} />
      <div className={classes.Textbox}>
        <Image src={logo} width={150} height={150} />
        <Title order={2} color="#fff" className={classes.SubTitle}>
          BITS Pilani Hyderabad Campus
        </Title>
        <Title order={1} color="#fff" className={classes.Title}>
          Knowledge Management Portal
        </Title>
        <Button.Group className={classes.ButtonGroup}>
          <GoogleLogin
            theme="light"
            buttonText="Login"
            onSuccess={(credentialResponse) => {
              Login(credentialResponse);
            }}
            onFailure={Login}
          />
          {/* <Button onClick={() => setLoggedIn(true)}>Login</Button> */}
        </Button.Group>
      </div>
    </div>
  );
}

export default LandingPage;
