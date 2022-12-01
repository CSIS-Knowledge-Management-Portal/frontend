import {
  Button,
  createStyles,
  Divider,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  titleText: {
    fontSize: 24,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 24 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 24 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 18,
    },
  },
  text: {
    fontSize: 16,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 16 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 16 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 14,
    },
  },
  Group: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "20%",
    height: 60,
    borderRadius: 20,
    marginTop: 20,
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 50,
      width: "25%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 45,
      width: "25%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 45,
      width: "45%",
    },
  },
}));

function RequestApprovalPage() {
  const { classes } = useStyles();

  let url = window.location.href;
  let queryString = url.split("?")[1];
  const [loaderAccept, setLoaderAccept] = React.useState(false);
  const [loaderReject, setLoaderReject] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const Accept = async () => {
    setLoaderAccept(true);
    const data = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ROOT_URL}/api/request/mailaccept?${queryString}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    if (data.data) {
      setLoaderAccept(false);
      setDisabled(true);
    }
  };

  const Decline = async () => {
    setLoaderReject(true);
    const data = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ROOT_URL}/api/request/mailreject?${queryString}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    if (data.data) {
      setLoaderReject(false);
      setDisabled(true);
    }
  };

  return (
    <>
      <Paper shadow="xs" p="lg" className={classes.wrapper}>
        <Title className={classes.titleText} order={1}>
          Request Approval
        </Title>
        <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
        <Text className={classes.text} sx={{ marginTop: 10, marginBottom: 15 }}>
          Kindly provide your consent for the requested user to travel along
          with you.
        </Text>
        <Text c="red" className={classes.text} sx={{ marginBottom: 15 }}>
          You can only respond once.
        </Text>

        <Button.Group className={classes.Group}>
          <Button
            style={{ background: "green" }}
            onClick={() => Accept()}
            loading={loaderAccept}
            disabled={disabled}
            className={classes.button}
          >
            {loaderAccept ? null : "Accept"}
          </Button>
          <Button
            style={{ background: "red" }}
            onClick={() => Decline()}
            loading={loaderReject}
            className={classes.button}
            disabled={disabled}
          >
            {loaderReject ? null : "Reject"}
          </Button>
        </Button.Group>
      </Paper>
    </>
  );
}

export default RequestApprovalPage;
