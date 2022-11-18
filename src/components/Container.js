import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: 88,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "1320px",

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "1140px",
      marginTop: 68 * 0.85 + 20,
    },

    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "960px",
      marginTop: 68 * 0.7 + 20,
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "720px",
      marginTop: 64,
    },

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "540px",
    },

    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "100%",
    },
  },
}));

function Container({ children }) {
  const { classes } = useStyles();

  return <div className={classes.container}>{children}</div>;
}

export default Container;
