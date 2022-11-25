import { Text, createStyles, Button, Tabs } from "@mantine/core";
import React from "react";
import CustomDiv from "../components/CustomDiv";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router";
import axios from "axios";

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

  wrapper: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
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

  tabLabel: {
    transitionDuration: "0.2s",
    "&:hover": {
      color: "white",
    },
  },
}));

function PendingApprovalPage() {
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");
  let navigate = useNavigate();

  const [sent, setSent] = React.useState();
  const [received, setReceived] = React.useState();

  React.useEffect(() => {
    const Sent = async () => {
      const data = await axios.get(
        "http://localhost:8000/api/request/all-sent",
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setSent(data.data);
    };
    Sent();

    const Received = async () => {
      const data = await axios.get(
        "http://localhost:8000/api/request/all-received",
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setReceived(data.data);
    };
    Received();
  }, []);

  console.log(sent);

  return (
    <>
      <Button variant="subtle" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Pending Approval</Text>
        <Tabs
          classNames={{ tabLabel: classes.tabLabel }}
          variant="outline"
          orientation={largeScreen ? "vertical" : "horizontal"}
          style={{ marginTop: largeScreen ? 0 : 16 }}
          defaultValue="sent"
        >
          <Tabs.List style={{ marginBottom: largeScreen ? 0 : 16 }}>
            <Tabs.Tab value="sent">Sent</Tabs.Tab>
            <Tabs.Tab value="recieved">Recieved</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="sent" pl="xl">
            {sent?.map((item, id) => (
              <CustomDiv key={id} type={5} item={item} />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="recieved" pl="xl">
            {received?.map((item, id) => (
              <CustomDiv type={6} key={id} item={item} />
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}

export default PendingApprovalPage;
