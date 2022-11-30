import {
  Text,
  createStyles,
  Button,
  Card,
  Collapse,
  Modal,
  Accordion,
} from "@mantine/core";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import Cabs from "../utils/cabs";
import Autos from "../utils/Auto";

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
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  box: {
    height: 70,
    width: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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

    "&:hover": {
      borderColor: "white",
      borderWidth: 0.7,
      transitionDuration: "0.3s",
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
  const [vehicleId, setVehicleId] = React.useState(null);
  const [seats, setSeats] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();
  const { state } = useLocation();

  const Trip = async () => {
    setLoading(true);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_ROOT_URL}/api/trip/create`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        source: state.source,
        destination: state.destination,
        departure_date: state.departure_date,
        departure_time: state.departure_time,
        waiting_time: state.waiting_time,
        details: state.details,
        passengers: state.passengers,
        vendor: "Cabs",
        car_name: vehicle,
        seats: seats,
        vendor_phone: phone,
      },
    });
    setOpened(true);
    setLoading(false);
  };

  const [opened, setOpened] = React.useState(false);
  console.log("pass", state.departure_time);

  return (
    <>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Available Vendors</Text>
        <Text className={classes.pageSubtitle}>Cabs</Text>
        <div className={classes.vendorGroup}>
          <Accordion variant="contained">
            {Cabs.map((item, id) => (
              <Accordion.Item value={item.name}>
                <Accordion.Control>
                  {item.name} - {item.phone}
                </Accordion.Control>
                <Accordion.Panel>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    {item.cars.map((item, id) =>
                      state.noOfMembers <= item.capacity ? (
                        <Card
                          className={classes.box}
                          withBorder
                          onClick={() => {
                            setVehicle(item.name);
                            setVehicleId(item.id);
                            setSeats(item.capacity);
                          }}
                          style={{
                            borderColor: vehicleId === item.id ? "white" : null,
                            transitionDuration: "0.3s",
                          }}
                        >
                          <Text>{item.name}</Text>
                          <Text>Capacity: {item.capacity}</Text>
                        </Card>
                      ) : null
                    )}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <Text className={classes.pageSubtitle}>Auto</Text>
          <Accordion variant="contained">
            {Autos.map((item, id) => (
              <Accordion.Item value={item.name}>
                <Accordion.Control>
                  {item.name} - {item.phone}
                </Accordion.Control>
                <Accordion.Panel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setVehicle(item.name);
                      setSeats(item.capacity);
                    }}
                  >
                    <Text>Capacity: {item.capacity}</Text>
                    <Button variant="outline">Select</Button>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

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
          loading={loading}
        >
          {loading ? null : "Confirm Trip"}
        </Button>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Trip confirmed!"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          Please contact the vendor to confirm car details and trip status.
        </Text>
        <Button onClick={() => navigate("/upcoming-trips")}>Got it!</Button>
      </Modal>
    </>
  );
}

export default ChooseVendorPage;
