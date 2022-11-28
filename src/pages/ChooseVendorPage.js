import {
  Text,
  createStyles,
  Button,
  Card,
  Collapse,
  Modal,
} from "@mantine/core";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import Private from "../utils/cabs";

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
    cursor: "pointer",
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
  const [seats, setSeats] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
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
        vendor: "Private",
        car_name: vehicle,
        seats: seats,
        vendor_phone: phone,
      },
    });

    console.log(data.data);
    setOpened(true);
  };

  const [opened, setOpened] = React.useState(false);
  console.log("pass", state.passengers);

  return (
    <>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Create New Post</Text>
        <Text className={classes.pageSubtitle}>Choose Vehicle</Text>
        <div className={classes.vendorGroup}>
          {Private.map((item, id) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                className={classes.box}
                withBorder
                onClick={() => {
                  setSeats(item.seats);
                  setVehicle(item.car);
                  setPhone(item.phone);
                }}
              >
                <Text>{item.car}</Text>
              </Card>
              <Text>Capacity: {item.seats}</Text>
            </div>
          ))}
        </div>
        {/* <Collapse in={vendor ? true : false}>
          <Text className={classes.pageSubtitle}>Choose Vehicle</Text>
          <div className={classes.vendorGroup}>
            {Private.map((item, id) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  className={classes.box}
                  withBorder
                  onClick={() => {
                    setSeats(item.seats);
                    setVehicle(item.car);
                    setPhone(item.phone);
                  }}
                />
                <Text>{item.car}</Text>
                <Text>Capacity: {item.seats}</Text>
              </div>
            ))}
          </div>
        </Collapse> */}
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          onClick={() => navigate(-1)}
        >
          Previous
        </Button>
        <Button
          disabled={vehicle ? false : true}
          className={classes.confirmButton}
          onClick={() => Trip()}
        >
          Confirm Trip
        </Button>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Filters"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Trip confirmed!</Text>
        <Text>
          Please contact the following number to confirm car details and trip
          status with the vendor.
        </Text>
        <Button onClick={() => navigate("/posts")}>Close</Button>
      </Modal>
    </>
  );
}

export default ChooseVendorPage;
