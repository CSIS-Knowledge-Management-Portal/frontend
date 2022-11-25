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

  const Accept = async () => {
    const data = await axios({
      method: "get",
      url: `http://localhost:8000/api/request/accept?${queryString}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    console.log(data.data);
  };

  const Decline = async () => {
    const data = await axios({
      method: "get",
      url: `http://localhost:8000/api/request/reject?${queryString}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    console.log(data.data);
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
        <Button style={{ background: "green" }} onClick={() => Accept()}>
          Accept
        </Button>
        <Button style={{ background: "red" }} onClick={() => Decline()}>
          Reject
        </Button>
      </div>
    </>
  );
}

export default RequestApprovalPage;
