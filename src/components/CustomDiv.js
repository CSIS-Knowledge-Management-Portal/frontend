import React from "react";
import {
  ActionIcon,
  Button,
  Card,
  CardSection,
  Center,
  Collapse,
  createStyles,
  Dialog,
  Text,
} from "@mantine/core";
import { IconCheck, IconEdit, IconX, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import axios from "axios";
import { ReactComponent as NothingSVG } from "../assets/undraw_no_data.svg";
import { UserContext } from "../utils/Context";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.customDark[7]
        : theme.colors.gray[1],
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
    borderColor: theme.colors.customDark[2],
    borderWidth: 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      // width: 715 * 0.85,
      marginTop: 20 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      // width: 715 * 0.7,
      marginTop: 20 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      // width: "90%",
      marginTop: 20 * 0.54,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // width: "90%",
      marginTop: 20 * 0.41,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      // width: "90%",
      marginTop: 15,
      marginBottom: 10,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  titleBox: {
    backgroundColor: theme.colors.customDark[6],
    color: theme.colors.customDark[0],
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomStyle: "solid",
    borderWidth: 0.7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 20 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 20 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 14,
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 14,
    },
  },

  Textbox: {
    padding: 10,
    fontSize: 16,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 16 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 16 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 12,
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 12,
    },
  },
  text: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.customDark[6],
    transitionDuration: "0.3s",
    "&:hover": {
      backgroundColor: theme.fn.lighten(theme.colors.customDark[6], 0.1),
    },
    borderColor: theme.colors.customDark[2],
    borderStyle: "none",
    borderTopStyle: "solid",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 56 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 56 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 56 * 0.6,
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: 56 * 0.6,
    },
  },

  label: {
    fontWeight: 500,
    fontSize: 16,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 16 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 16 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 12,
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 12,
    },
  },

  itemList: {
    minHeight: 193,
    maxHeight: window.innerHeight / 3,
    overflow: "hidden",
    overflowY: "scroll",
    paddingLeft: 20,
    paddingRight: 20,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: 16,
      paddingRight: 16,
      minHeight: 150,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      paddingLeft: 14,
      paddingRight: 14,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },

  roundedButton: {
    borderRadius: 10,
    fontSize: 14,
    marginRight: 40,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 14 * 0.85,
      marginRight: 30,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 14 * 0.7,
      marginRight: 20,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 10,
      marginRight: 10,
    },
  },
}));

export default function CustomDiv({ type, item, email }) {
  const {
    userDetail,
    upcomingTrips,
    pastTrips,
    sentRequests,
    recievedRequests,
    setSentRequests,
    setRecievedRequests,
  } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [showDetails, setShowDetails] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [opened1, setOpened1] = React.useState(false);
  const [disabled1, setDisabled1] = React.useState(false);
  let navigate = useNavigate();

  const [loaderAccept, setLoaderAccept] = React.useState(false);
  const [loaderReject, setLoaderReject] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const Accept = async (item) => {
    setLoaderAccept(true);
    let trip_id = item?.post_link?.split("/");
    trip_id = trip_id[trip_id?.length - 1];
    const data = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ROOT_URL}/api/request/accept?id=${item?.sender?.email}&pid=${trip_id}&rid=${item?.id}&plink=${item?.post_link}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    if (data.data) {
      getRecievedRequests();
      setLoaderAccept(false);
      setDisabled(true);
    }
  };

  const Decline = async (item) => {
    setLoaderReject(true);
    let trip_id = item?.post_link?.split("/");
    trip_id = trip_id[trip_id?.length - 1];
    const data = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ROOT_URL}/api/request/reject?id=${item?.sender?.email}&pid=${trip_id}&rid=${item?.id}&plink=${item?.post_link}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    if (data.data) {
      getRecievedRequests();
      setLoaderReject(false);
      setDisabled(true);
    }
  };

  const Delete = async (id) => {
    console.log("deleting ", id);
    const data = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_ROOT_URL}/api/trip/delete/${id}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    console.log(data.data);
    window.location.reload();
  };

  const SendRequest = async (item) => {
    setLoading1(true);
    const data = await axios({
      method: "post",
      url: `${process.env.REACT_APP_ROOT_URL}/api/request/new`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        trip_link: `${process.env.REACT_APP_ROOT_URL}/post-details/${item.id}`,
        trip_id: item.id,
        requestor: userDetail?.email,
        creator: item.creator?.email,
      },
    });
    if (data.data) {
      getSentRequests();
      setLoading1(false);
      setDisabled1(true);
      setOpened1(true);
      setTimeout(() => {
        setOpened1(false);
      }, 3000);
    }
  };

  const getSentRequests = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/request/all-sent`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setSentRequests(data.data);
    },
    [sentRequests]
  );

  const getRecievedRequests = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/request/all-received`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setRecievedRequests(data.data);
    },
    [recievedRequests]
  );

  React.useEffect(() => {}, [disabled]);

  switch (type) {
    case 1:
      let match = item?.requests.filter(
        (item) => item?.requestor_email === userDetail?.email
      );
      match = match[match?.length - 1];
      return (
        <>
          <Card withBorder className={classes.wrapper}>
            <CardSection className={classes.Textbox}>
              <div className={classes.text}>
                <Text c="dimmed">To: </Text>
                <Text>{item.source}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">From: </Text>
                <Text>{item.destination}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Date: </Text>
                <Text>{dayjs(item.departure_date).format("MMMM D, YYYY")}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Space Available: </Text>
                <Text>{item.seats - item.passengers.length}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Waiting time: </Text>
                <Text>{item.waiting_time}</Text>
              </div>
              <Collapse in={showDetails}>
                <div className={classes.text}>
                  <Text c="dimmed">Details: </Text>
                  <Text>{item.details}</Text>
                </div>
              </Collapse>
            </CardSection>
            <CardSection>
              <Button.Group
                buttonBorderWidth={0.7}
                className={classes.buttonGroup}
              >
                <Button
                  classNames={{ root: classes.button, label: classes.label }}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </Button>
                <Button
                  classNames={{ root: classes.button, label: classes.label }}
                  style={{
                    buttonBorderWidth: 0.7,
                    borderTopStyle: "solid",
                    borderLeftStyle: "solid",
                    borderColor: "white",
                    color: "white",
                    background:
                      match?.status === "Accepted"
                        ? "green"
                        : match?.status === "Unconfirmed"
                        ? "gray"
                        : null,
                  }}
                  onClick={() => SendRequest(item)}
                  loading={loading1}
                  disabled={
                    disabled1
                      ? true
                      : match
                      ? match?.status === "Rejected"
                        ? false
                        : true
                      : false
                  }
                >
                  {loading1
                    ? null
                    : match
                    ? match?.status === "Rejected"
                      ? "Send Request"
                      : match?.status
                    : "Send Request"}
                </Button>
              </Button.Group>
            </CardSection>
          </Card>
          <Dialog
            withCloseButton={false}
            opened={opened1}
            onClose={() => setOpened1(false)}
            position={{ bottom: 20, right: 100 }}
          >
            <Text color={"green"} style={{ textAlign: "center" }}>
              Request Sent
            </Text>
          </Dialog>
        </>
      );

    case 2:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.titleBox}>
            <Text>Recieved Requests</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/pending-approval")}
            >
              View All
            </Text>
          </CardSection>
          <div className={classes.itemList}>
            {recievedRequests?.length > 0 ? (
              recievedRequests.slice(0, 2)?.map((item, id) => (
                <CardSection
                  key={id}
                  withBorder
                  className={classes.Textbox}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transitionDuration: "3s",
                    display: disabled
                      ? setTimeout(() => {
                          return "none";
                        }, 2000)
                      : "flex",
                  }}
                >
                  <div>
                    <div className={classes.text}>
                      <Text c="dimmed">From: </Text>
                      <Text>{item.source}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">To: </Text>
                      <Text>{item.destination}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">Date: </Text>
                      <Text>{item.departure_date}</Text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      leftIcon={<IconCheck />}
                      variant="outline"
                      color="green"
                      classNames={{
                        root: classes.roundedButton,
                      }}
                      styles={(theme) => ({
                        root: {
                          transitionDuration: "0.2s",
                          background: disabled ? "green" : null,
                          "&:hover": {
                            color: theme.fn.lighten("#00FF47", 0.05),
                            borderColor: theme.fn.lighten("#00FF47", 0.05),
                          },
                        },
                      })}
                      loading={loaderAccept}
                      disabled={disabled}
                      onClick={() => Accept(item)}
                    >
                      Accept
                    </Button>
                    <ActionIcon
                      variant="outline"
                      style={{
                        color: "red",
                        borderColor: "red",
                      }}
                      classNames={{ root: classes.roundedButton }}
                      onClick={() => Decline(item)}
                      loading={loaderReject}
                      disabled={disabled}
                    >
                      <IconX size={22} />
                    </ActionIcon>
                  </div>
                </CardSection>
              ))
            ) : (
              <Center style={{ width: "100%", height: "100%" }}>
                <NothingSVG />
              </Center>
            )}
          </div>
        </Card>
      );

    case 3:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.titleBox}>
            <Text>Upcoming Trips</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/upcoming-trips")}
            >
              View All
            </Text>
          </CardSection>
          <div className={classes.itemList}>
            {upcomingTrips?.length > 0 ? (
              upcomingTrips.slice(0, 2)?.map((item, id) => (
                <CardSection
                  key={id}
                  withBorder
                  className={classes.Textbox}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className={classes.text}>
                      <Text c="dimmed">From: </Text>
                      <Text>{item.source}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">To: </Text>
                      <Text>{item.destination}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">Date: </Text>
                      <Text>{item.departure_date}</Text>
                    </div>
                  </div>
                  {/* <Button
                  leftIcon={<IconCheck />}
                  variant="outline"
                  color="blue"
                  style={{ marginRight: 0 }}
                  classNames={{ root: classes.roundedButton }}
                  styles={(theme) => ({
                    root: {
                      transitionDuration: "0.2s",
                      padding: 8,
                      "&:hover": {
                        color: theme.fn.lighten("#0059C5", 0.1),
                        borderColor: theme.fn.lighten("#0059C5", 0.1),
                      },
                    },
                  })}
                >
                  Add to Calendar
                </Button> */}
                </CardSection>
              ))
            ) : (
              <Center style={{ width: "100%", height: "100%" }}>
                <NothingSVG width="20px" />
              </Center>
            )}
          </div>
        </Card>
      );

    case 4:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.Textbox}>
            <div className={classes.text}>
              <Text c="dimmed">To: </Text>
              <Text>{item.destination}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">From: </Text>
              <Text>{item.source}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Date: </Text>
              <Text>{dayjs(item.departure_date).format("MMMM D, YYYY")}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Members: </Text>
              <div>
                {item.passengers.map((passenger, id) => (
                  <Text key={id}>
                    {passenger.name}
                    {" <"}
                    {passenger.email}
                    {">"}{" "}
                  </Text>
                ))}
              </div>
            </div>
          </CardSection>
        </Card>
      );

    case 5:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.Textbox}>
            <div className={classes.text}>
              <Text c="dimmed">To: </Text>
              <Text>{item.destination}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">From: </Text>
              <Text>{item.source}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Date: </Text>
              <Text>{dayjs(item.departure_date).format("MMMM D, YYYY")}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Reciever: </Text>
              <Text>
                {item?.receiver?.name}
                {" <"}
                {item?.receiver?.email}
                {">"}{" "}
              </Text>
            </div>
          </CardSection>
          <CardSection>
            <Button.Group
              buttonBorderWidth={0.7}
              className={classes.buttonGroup}
            >
              <Button
                classNames={{ root: classes.button, label: classes.label }}
                style={{
                  background:
                    item.status === "Unconfirmed"
                      ? null
                      : item.status === "Accepted"
                      ? "green"
                      : "red",
                }}
              >
                {item.status}
              </Button>
              {/* <Button
                classNames={{ root: classes.button, label: classes.label }}
                style={{ borderLeftStyle: "solid" }}
              >
                Go to Post
              </Button> */}
            </Button.Group>
          </CardSection>
        </Card>
      );

    case 6:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.Textbox}>
            <div className={classes.text}>
              <Text c="dimmed">To: </Text>
              <Text>{item.destination}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">From: </Text>
              <Text>{item.source}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Date: </Text>
              <Text>{dayjs(item.departure_date).format("MMMM D, YYYY")}</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Requested By: </Text>
              <Text>
                {item.sender.name}
                {" <"}
                {item.sender.email}
                {">"}
              </Text>
            </div>
          </CardSection>
          <CardSection>
            <Button.Group
              buttonBorderWidth={0.7}
              className={classes.buttonGroup}
            >
              <Button
                leftIcon={<IconCheck />}
                classNames={{ root: classes.button, label: classes.label }}
                style={{ color: "#00FF47" }}
                loading={loaderAccept}
                disabled={disabled}
                onClick={() => Accept(item)}
              >
                Accept
              </Button>
              <Button
                leftIcon={<IconX />}
                classNames={{ root: classes.button, label: classes.label }}
                style={{ borderLeftStyle: "solid", color: "red" }}
                onClick={() => Decline(item)}
                loading={loaderReject}
                disabled={disabled}
              >
                Decline
              </Button>
            </Button.Group>
          </CardSection>
        </Card>
      );

    case 7:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection
            className={classes.Textbox}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className={classes.text}>
                <Text c="dimmed">Source: </Text>
                <Text>{item.source}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Destination: </Text>
                <Text>{item.destination}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Date: </Text>
                <Text>{dayjs(item.departure_date).format("MMMM D, YYYY")}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Departure Time: </Text>
                <Text>{item.departure_time}</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Organiser: </Text>
                <Text>
                  {item.creator.name}
                  {" <"}
                  {item.creator.email}
                  {">"}{" "}
                </Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Members: </Text>
                <div>
                  {item.passengers.map((passenger, id) => (
                    <Text key={id}>
                      {passenger.name}
                      {" <"}
                      {passenger.email}
                      {">"}{" "}
                    </Text>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{ padding: 0, display: "flex", flexDirection: "column" }}
            >
              <ActionIcon
                variant="transparent"
                disabled={email === item.creator.email ? false : true}
                style={{
                  height: "100%",
                  borderLeftColor: "white",
                  borderBottomColor: "white",
                }}
                radius={0}
                size={30}
                onClick={() =>
                  navigate("/create-post", {
                    state: {
                      flag: true,
                      data: item,
                    },
                  })
                }
              >
                <IconEdit color="skyblue" style={{ marginLeft: 10 }} />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                disabled={email === item.creator.email ? false : true}
                style={{
                  height: "100%",
                  borderLeftColor: "white",
                }}
                radius={0}
                size={30}
                onClick={() => Delete(item.id)}
              >
                <IconTrash color="red" style={{ marginLeft: 10 }} />
              </ActionIcon>
            </div>
          </CardSection>
        </Card>
      );

    case 8:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.titleBox}>
            <Text>Past Trips</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/past-trips")}
            >
              View All
            </Text>
          </CardSection>
          <div className={classes.itemList}>
            {pastTrips?.length > 0 ? (
              pastTrips.slice(0, 2)?.map((item, id) => (
                <CardSection
                  key={id}
                  withBorder
                  className={classes.Textbox}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className={classes.text}>
                      <Text c="dimmed">From: </Text>
                      <Text>{item.source}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">To: </Text>
                      <Text>{item.destination}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">Date: </Text>
                      <Text>{item.departure_date}</Text>
                    </div>
                  </div>
                </CardSection>
              ))
            ) : (
              <Center style={{ width: "100%", height: "100%" }}>
                <NothingSVG />
              </Center>
            )}
          </div>
        </Card>
      );

    case 9:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.titleBox}>
            <Text>Sent Requests</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/pending-approval")}
            >
              View All
            </Text>
          </CardSection>
          <div className={classes.itemList}>
            {sentRequests?.length > 0 ? (
              sentRequests.slice(0, 2)?.map((item, id) => (
                <CardSection
                  key={id}
                  withBorder
                  className={classes.Textbox}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div className={classes.text}>
                      <Text c="dimmed">From: </Text>
                      <Text>{item.source}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">To: </Text>
                      <Text>{item.destination}</Text>
                    </div>
                    <div className={classes.text}>
                      <Text c="dimmed">Date: </Text>
                      <Text>{item.departure_date}</Text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outline"
                      style={{
                        marginRight: 0,
                        cursor: "initial",
                        color: "white",
                        background:
                          item.status === "Unconfirmed"
                            ? null
                            : item.status === "Accepted"
                            ? "green"
                            : "red",
                        borderColor:
                          item.status === "Unconfirmed"
                            ? null
                            : item.status === "Accepted"
                            ? "green"
                            : "red",
                      }}
                      classNames={{
                        root: classes.roundedButton,
                      }}
                    >
                      {item.status}
                    </Button>
                  </div>
                </CardSection>
              ))
            ) : (
              <Center style={{ width: "100%", height: "100%" }}>
                <NothingSVG />
              </Center>
            )}
          </div>
        </Card>
      );

    default:
      break;
  }
}
