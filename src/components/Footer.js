import React from "react";
import { Link } from "react-router-dom";
import { Center, createStyles, Text, Title } from "@mantine/core";
import { ReactComponent as Heart } from "../assets/undraw_heart.svg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    bottom: 0,
    height: 300,
    width: "100%",
    backgroundColor: "black",
    color: "white",

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 260,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 220,
    },
  },

  title: {
    position: "relative",
    top: "20%",
    textAlign: "center",
    transform: "translateY(-50%)",
    fontWeight: 300,
    cursor: "default",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: "15%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: "15%",
    },
  },

  text: {
    color: "white",
    textTransform: "capitalize",
    position: "relative",
    top: "30%",
    textAlign: "center",
    cursor: "default",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: "25%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: "20%",
    },
  },

  link: {
    position: "relative",
    top: "40%",
    justifyContent: "center",
    gap: 10,
    fontSize: 12,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: "35%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: "30%",
    },
  },

  copyright: {
    color: "white",
    textTransform: "capitalize",
    position: "relative",
    top: "55%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    cursor: "default",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: "45%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: "40%",
    },
  },
}));

function Footer() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Title order={3} className={classes.title}>
        T R A V E L @ B P H C
      </Title>

      <Text className={classes.text}>
        Made with ❤️ by{" "}
        <a
          target={"_blank"}
          href="https://www.linkedin.com/in/aarush-sinha-66a790201/"
        >
          AARUSH
        </a>{" "}
        &{" "}
        <a target={"_blank"} href="https://www.linkedin.com/in/shuklashivansh/">
          SHIVANSH
        </a>
      </Text>

      <Center className={classes.link}>
        <Link to="/" exact>
          <Text>Dashboard</Text>
        </Link>
        <Link to="/posts" exact>
          <Text>All Posts</Text>
        </Link>
        <Link to="/upcoming-trips">
          <Text>Upcoming</Text>
        </Link>
        <Link to="/past-trips" exact>
          <Text>Past</Text>
        </Link>
        <Link to="/pending-approval" exact>
          <Text>Approval</Text>
        </Link>
      </Center>
      <Text className={classes.copyright}>© Travel@BPHC 2022</Text>
    </div>
  );
}

export default Footer;
