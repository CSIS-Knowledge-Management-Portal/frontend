import {
  Text,
  createStyles,
  TextInput,
  ActionIcon,
  Chip,
  Textarea,
  Button,
  Tabs,
} from "@mantine/core";
import React from "react";
import {
  IconMapPin,
  IconCalendar,
  IconPlus,
  IconMinus,
  IconClock,
} from "@tabler/icons";
import { DatePicker, TimeInput } from "@mantine/dates";
import CustomDiv from "../components/CustomDiv";
import { useMediaQuery } from "@mantine/hooks";

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
  return (
    <>
      <Button variant="subtle">Go Back</Button>
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
            {[1, 1, 1, 1, 1, 1, 1].map(() => (
              <CustomDiv type={5} />
            ))}
          </Tabs.Panel>

          <Tabs.Panel value="recieved" pl="xl">
            {[1, 1, 1, 1, 1, 1, 1].map(() => (
              <CustomDiv type={6} />
            ))}
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}

export default PendingApprovalPage;
