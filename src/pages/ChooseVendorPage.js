import { Text, createStyles, Button, Card } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
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

  pageSubtitle: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 18,
    textAlign: "center",
    color: theme.colors.customDark[1],
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 18 * 0.85,
      marginTop: 24 * 0.85,
      marginBottom: 24 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 18 * 0.7,
      marginTop: 24 * 0.7,
      marginBottom: 24 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 14,
      marginTop: 16,
      marginBottom: 16,
    },
  },

  wrapper: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "50%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "65%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "85%",
    },
  },

  vendorGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  box: {
    height: 160,
    width: 160,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "50%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "65%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "85%",
    },
  },

  button: {
    width: "30%",
    alignSelf: "center",
    height: 80,
    borderRadius: 20,
    marginTop: 40,
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 70,
      marginTop: 30,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 60,
      marginTop: 25,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 50,
      marginTop: 20,
    },
  },

  confirmButton: {
    width: "50%",
    alignSelf: "center",
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
}));

function ChooseVendorPage() {
  const { classes } = useStyles();
  const [valueFrom, setValueFrom] = React.useState("");
  let navigate = useNavigate();
  return (
    <>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Create New Post</Text>
        <Text className={classes.pageSubtitle}>Choose Vendor</Text>
        <div className={classes.vendorGroup}>
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
        </div>
        <Text className={classes.pageSubtitle}>Choose Vehicle</Text>
        <div className={classes.vendorGroup}>
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
          <Card className={classes.box} withBorder />
        </div>
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          onClick={() => navigate(-1)}
        >
          Previous
        </Button>
        <Button className={classes.confirmButton} onClick={() => navigate("/")}>
          Confirm Trip
        </Button>
      </div>
    </>
  );
}

export default ChooseVendorPage;
