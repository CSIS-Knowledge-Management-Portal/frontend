import {
  Text,
  createStyles,
  Button,
  Tabs,
  Center,
  Loader,
} from "@mantine/core";
import React from "react";
import CustomDiv from "../components/CustomDiv";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router";
import axios from "axios";
import { ReactComponent as BlankSVG } from "../assets/undraw_nothing.svg";
import { UserContext } from "../utils/Context";

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
  const { sentRequests, recievedRequests } = React.useContext(UserContext);
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 900px)");
  let navigate = useNavigate();

  const [pageLoading, setPageLoading] = React.useState(true);

  React.useEffect(() => {}, []);

  if (pageLoading && recievedRequests && sentRequests) {
    setPageLoading(false);
  }

  return !pageLoading ? (
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
            {sentRequests?.length > 0 ? (
              sentRequests?.map((item, id) => (
                <CustomDiv key={id} type={5} item={item} />
              ))
            ) : (
              <BlankSVG
                width={"40%"}
                height={"40%"}
                style={{
                  alignSelf: "center",
                  marginTop: "40%",
                  marginLeft: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="recieved" pl="xl">
            {recievedRequests?.length > 0 ? (
              recievedRequests?.map((item, id) => (
                <CustomDiv type={6} key={id} item={item} />
              ))
            ) : (
              <BlankSVG
                width={"40%"}
                height={"40%"}
                style={{
                  alignSelf: "center",
                  marginTop: "40%",
                  marginLeft: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default PendingApprovalPage;
