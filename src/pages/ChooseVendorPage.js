import { Text, createStyles, Button, Card, Collapse } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router";

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
  const [vendor, setVendor] = React.useState(null);
  const [vehicle, setVehicle] = React.useState(null);
  let navigate = useNavigate();
  const { state } = useLocation();

  const Trip = async () => {
    console.log(state);
    const data = await axios({
      method: "post",
      url: "http://localhost:8000/api/trip/create",
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        source: state.source,
        destination: state.destination,
        departure_date: state.departure_date,
        departure_time: state.departure_time,
        waiting_time: state.waiting_time,
        details: state.details,
        passengers: state.passengers,
        vendor: vendor,
        seats: vehicle,
      },
    });

    console.log(data.data);

    navigate("/posts");
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Create New Post</Text>
        <Text className={classes.pageSubtitle}>Choose Vendor</Text>
        <div className={classes.vendorGroup}>
          <Card
            className={classes.box}
            withBorder
            onClick={() => setVendor("Uber")}
          />
          <Card
            className={classes.box}
            withBorder
            onClick={() => setVendor("Ola")}
          />
          <Card
            className={classes.box}
            withBorder
            onClick={() => setVendor("Private")}
          />
        </div>
        <Collapse in={vendor ? true : false}>
          <Text className={classes.pageSubtitle}>Choose Vehicle</Text>
          <div className={classes.vendorGroup}>
            <Card
              className={classes.box}
              withBorder
              onClick={() => setVehicle(3)}
            />
            <Card
              className={classes.box}
              withBorder
              onClick={() => setVehicle(4)}
            />
            <Card
              className={classes.box}
              withBorder
              onClick={() => setVehicle(5)}
            />
            <Card
              className={classes.box}
              withBorder
              onClick={() => setVehicle(6)}
            />
            <Card
              className={classes.box}
              withBorder
              onClick={() => setVehicle(7)}
            />
          </div>
        </Collapse>
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          onClick={() => navigate(-1)}
        >
          Previous
        </Button>
        <Button
          disabled={vendor ? false : true}
          className={classes.confirmButton}
          onClick={() => Trip()}
        >
          Confirm Trip
        </Button>
      </div>
    </>
  );
}

export default ChooseVendorPage;
