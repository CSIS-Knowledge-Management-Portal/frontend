import { Text, createStyles, Grid, Button } from "@mantine/core";
import React from "react";
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

function Homepage() {
  const { classes } = useStyles();
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Text
          className={classes.Title}
          variant="gradient"
          gradient={{ from: "blue.5", to: "pink.7", deg: 0 }}
        >
          Hi, Shivansh!
        </Text>
      </div>
      <Grid gutter={40}>
        <Grid.Col xs={12} md={7}>
          {[1, 1, 1, 1, 1, 1, 1].map((item, id) => (
            <CustomDiv key={id} type={1} />
          ))}
        </Grid.Col>
        <Grid.Col md={5}>
          <div className={classes.sidePanel}>
            <CustomDiv type={2} />
            <CustomDiv type={3} />
            <Button className={classes.button}>Create New Trip</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Homepage;
