import React from "react";
import {
  ActionIcon,
  Button,
  Card,
  CardSection,
  Collapse,
  createStyles,
  Dialog,
  Text,
} from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import axios from "axios";

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
      marginTop: 5,
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
    minHeight: 100,
    maxHeight: window.innerHeight / 3,
    overflow: "hidden",
    overflowY: "scroll",
    paddingLeft: 20,
    paddingRight: 20,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: 16,
      paddingRight: 16,
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
  const { classes } = useStyles();
  const [showDetails, setShowDetails] = React.useState(false);
  const [pastPosts, setPastPosts] = React.useState(null);
  const [sent, setSent] = React.useState();
  const [received, setReceived] = React.useState();
  const [upcomingPosts, setUpcomingPosts] = React.useState(null);
  const [user, setUser] = React.useState();
  const [loading1, setLoading1] = React.useState(false);
  const [opened1, setOpened1] = React.useState(false);
  const [disabled1, setDisabled1] = React.useState(false);
  let navigate = useNavigate();

  const [loaderAccept, setLoaderAccept] = React.useState(false);
  const [loaderReject, setLoaderReject] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  // const Accept = async () => {
  //   setLoaderAccept(true);
  //   const data = await axios({
  //     method: "get",
  //     url: `http://localhost:8000/api/request/accept?${queryString}`,
  //     headers: { Authorization: localStorage.getItem("SavedToken") },
  //   });
  //   if (data.data) {
  //     setLoaderAccept(false);
  //     setDisabled(true);
  //   }
  // };

  // const Decline = async () => {
  //   setLoaderReject(true);
  //   const data = await axios({
  //     method: "get",
  //     url: `http://localhost:8000/api/request/reject?${queryString}`,
  //     headers: { Authorization: localStorage.getItem("SavedToken") },
  //   });
  //   if (data.data) {
  //     setLoaderReject(false);
  //     setDisabled(true);
  //   }
  // };

  const SendRequest = async (item) => {
    setLoading1(true);
    const data = await axios({
      method: "post",
      url: `http://localhost:8000/api/request/new`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        trip_link: `http://localhost:3000/post/${item.id}`,
        trip_id: item.id,
        requestor: user?.email,
        creator: item.creator?.email,
      },
    });
    if (data.data) {
      setLoading1(false);
      setDisabled1(true);
      setOpened1(true);
      setTimeout(() => {
        setOpened1(false);
      }, 3000);
    }
  };
  React.useEffect(() => {
    const User = async () => {
      const data = await axios.get("http://localhost:8000/user/", {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setUser(data.data);
    };
    User();

    const UpcomingTrips = async () => {
      const data = await axios.get("http://localhost:8000/api/trip/upcoming", {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setUpcomingPosts(data.data.slice(0, 2));
    };
    UpcomingTrips();

    const PastTrips = async () => {
      const data = await axios.get("http://localhost:8000/api/trip/past", {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setPastPosts(data.data.slice(0, 2));
    };
    PastTrips();

    const ApprovalRecieved = async () => {
      const data = await axios.get(
        "http://localhost:8000/api/request/all-received",
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setReceived(data.data.slice(0, 2));
    };
    ApprovalRecieved();

    const ApprovalSent = async () => {
      const data = await axios.get(
        "http://localhost:8000/api/request/all-sent",
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setSent(data.data.slice(0, 2));
    };
    ApprovalSent();
  }, []);

  console.log(sent);

  switch (type) {
    case 1:
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
                  style={{ borderLeftStyle: "solid" }}
                  onClick={() => SendRequest(item)}
                  loading={loading1}
                  disabled={disabled1}
                >
                  {loading1 ? null : "Send Request"}
                </Button>
              </Button.Group>
            </CardSection>
          </Card>
          <Dialog
            withCloseButton
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
            {received?.map((item, id) => (
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
                    leftIcon={<IconCheck />}
                    variant="outline"
                    color="green"
                    classNames={{
                      root: classes.roundedButton,
                    }}
                    styles={(theme) => ({
                      root: {
                        transitionDuration: "0.2s",
                        "&:hover": {
                          color: theme.fn.lighten("#00FF47", 0.05),
                          borderColor: theme.fn.lighten("#00FF47", 0.05),
                        },
                      },
                    })}
                    // loading={loaderAccept}
                    // disabled={disabled}
                    // onClick={() => Accept()}
                  >
                    Accept
                  </Button>
                  <ActionIcon
                    variant="outline"
                    style={{ color: "red", borderColor: "red" }}
                    classNames={{ root: classes.roundedButton }}
                    // onClick={() => Decline()}
                    // loading={loaderReject}
                    // disabled={disabled}
                  >
                    <IconX size={22} />
                  </ActionIcon>
                </div>
              </CardSection>
            ))}
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
            {upcomingPosts?.map((item, id) => (
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
            ))}
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
                {item.receiver.name}
                {" <"}
                {item.receiver.email}
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
              <Text>Lorem Ipsum</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">From: </Text>
              <Text>Lorem</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Date: </Text>
              <Text>25 Feb 2023</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Space Available: </Text>
              <Text>2</Text>
            </div>
            <div className={classes.text}>
              <Text c="dimmed">Waiting time: </Text>
              <Text>1 hr</Text>
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
              >
                Accept
              </Button>
              <Button
                leftIcon={<IconX />}
                classNames={{ root: classes.button, label: classes.label }}
                style={{ borderLeftStyle: "solid", color: "red" }}
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
            <div style={{ padding: 0 }}>
              <ActionIcon
                variant="transparent"
                disabled={email === item.creator.email ? false : true}
                style={{
                  height: "100%",
                  borderLeftColor: "white",
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
                <IconEdit style={{ marginLeft: 10 }} />
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
            {pastPosts?.map((item, id) => (
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
            ))}
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
            {sent?.map((item, id) => (
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
            ))}
          </div>
        </Card>
      );

    default:
      break;
  }
}
