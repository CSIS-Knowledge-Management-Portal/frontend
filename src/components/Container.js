import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    // marginTop: 12,
    // marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    padding: 10,
    // minHeight: window.innerHeight - 300 - 88,

    // [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
    //   width: "1140px",
    //   minHeight: window.innerHeight - 269 - 40 - 68 * 0.85,
    // },

    // [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
    //   width: "960px",
    //   minHeight: window.innerHeight - 220 - 40 - 68 * 0.7,
    // },

    // [`@media (max-width: ${theme.breakpoints.md}px)`]: {
    //   width: "720px",
    //   minHeight: window.innerHeight - 220 - 84,
    // },

    // [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    //   width: "540px",
    //   marginTop: 0,
    // },

    // [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
    //   width: "100%",
    // },
  },
}));

function Container({ children }) {
  const { classes } = useStyles();

  return <div className={classes.container}>{children}</div>;
}

export default Container;
