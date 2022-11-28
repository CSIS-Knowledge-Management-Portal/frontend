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
  text: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
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
      url: `http://localhost:8000/api/request/mailaccept?${queryString}`,
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
      url: `http://localhost:8000/api/request/mailreject?${queryString}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    if (data.data) {
      setLoaderReject(false);
      setDisabled(true);
    }
  };

  return (
    <>
      <Paper shadow="xs" p="lg">
        <Title order={1}>Request Approval</Title>
        <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
        <Text sx={{ marginTop: 10, marginBottom: 15 }}>
          Kindly provide your consent for the requested user to travel along
          with you.
        </Text>
      </Paper>
      <div>
        <Button
          style={{ background: "green" }}
          onClick={() => Accept()}
          loading={loaderAccept}
          disabled={disabled}
        >
          {loaderAccept ? null : "Accept"}
        </Button>
        <Button
          style={{ background: "red" }}
          onClick={() => Decline()}
          loading={loaderReject}
          disabled={disabled}
        >
          {loaderReject ? null : "Reject"}
        </Button>
      </div>
    </>
  );
}

export default RequestApprovalPage;
