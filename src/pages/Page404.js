import { Text, createStyles, Button, Center, Loader } from "@mantine/core";
import axios from "axios";
import React from "react";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router";
import CustomDiv from "../components/CustomDiv";
import { ReactComponent as NotFound } from "../assets/undraw_404.svg";

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
    textAlign: "center",
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
    justifyContent: "center",
    gap: 20,
  },

  button: {
    width: "50%",
    alignSelf: "center",
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

function Page404() {
  const { classes } = useStyles();

  let navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <div>
        <Text className={classes.pageTitle}>404</Text>
        <Text className={classes.pageTitle}>PAGE NOT FOUND</Text>
      </div>
      <Center>
        <NotFound height={"80%"} />
      </Center>
      <Button
        variant="outline"
        className={classes.button}
        onClick={() => navigate("/")}
      >
        Go back to homepage
      </Button>
    </div>
  );
}

export default Page404;
