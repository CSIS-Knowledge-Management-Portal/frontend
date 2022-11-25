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

function LandingPage() {
  const { classes } = useStyles();
  return (
    <BackgroundImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Marine_Drive_%28BPHC%29.jpg/1280px-Marine_Drive_%28BPHC%29.jpg">
      <Text color="#fff">
        BackgroundImage component can be used to add any content on image. It is
        useful for hero headers and other similar sections
      </Text>
    </BackgroundImage>
  );
}

export default LandingPage;