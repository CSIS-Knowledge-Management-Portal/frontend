import React from "react";
import {
  ActionIcon,
  Button,
  Card,
  CardSection,
  Collapse,
  createStyles,
  Text,
} from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons";
import { useNavigate } from "react-router";

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

export default function CustomDiv({ type, item }) {
  const { classes } = useStyles();
  const [showDetails, setShowDetails] = React.useState(false);
  let navigate = useNavigate();

  switch (type) {
    case 1:
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
            <Collapse in={showDetails}>
              <div className={classes.text}>
                <Text c="dimmed">Details: </Text>
                <Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </Text>
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
                Show Details
              </Button>
              <Button
                classNames={{ root: classes.button, label: classes.label }}
                style={{ borderLeftStyle: "solid" }}
              >
                Send Request
              </Button>
            </Button.Group>
          </CardSection>
        </Card>
      );

    case 2:
      return (
        <Card withBorder className={classes.wrapper}>
          <CardSection className={classes.titleBox}>
            <Text>Approval Pending</Text>
            <Text
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/pending-approval")}
            >
              View All
            </Text>
          </CardSection>
          <div className={classes.itemList}>
            {[1, 1, 1, 1, 1].map(() => (
              <CardSection
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
                    <Text>Lorem Ipsum</Text>
                  </div>
                  <div className={classes.text}>
                    <Text c="dimmed">For: </Text>
                    <Text>Lorem</Text>
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
                  >
                    Accept
                  </Button>
                  <ActionIcon
                    variant="outline"
                    style={{ color: "red", borderColor: "red" }}
                    classNames={{ root: classes.roundedButton }}
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
            {[1, 1, 1, 1, 1].map(() => (
              <CardSection
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
                    <Text>Lorem Ipsum</Text>
                  </div>
                  <div className={classes.text}>
                    <Text c="dimmed">For: </Text>
                    <Text>Lorem</Text>
                  </div>
                </div>
                <Button
                  leftIcon={<IconCheck />}
                  variant="outline"
                  color="blue"
                  classNames={{ root: classes.roundedButton }}
                  styles={(theme) => ({
                    root: {
                      transitionDuration: "0.2s",
                      "&:hover": {
                        color: theme.fn.lighten("#0059C5", 0.1),
                        borderColor: theme.fn.lighten("#0059C5", 0.1),
                      },
                    },
                  })}
                >
                  Add to Calendar
                </Button>
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
        </Card>
      );

    case 5:
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
          </CardSection>
          <CardSection>
            <Button.Group
              buttonBorderWidth={0.7}
              className={classes.buttonGroup}
            >
              <Button
                classNames={{ root: classes.button, label: classes.label }}
              >
                Approval Awaited
              </Button>
              <Button
                classNames={{ root: classes.button, label: classes.label }}
                style={{ borderLeftStyle: "solid" }}
              >
                Go to Post
              </Button>
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
                <Text>Lorem Ipsum</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Destination: </Text>
                <Text>Lorem</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Date: </Text>
                <Text>25 Feb 2023</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Organiser: </Text>
                <Text>Shivansh Shukla</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Members: </Text>
                <Text>Aarush Sinha</Text>
              </div>
              <div className={classes.text}>
                <Text c="dimmed">Vendor: </Text>
                <Text>Uber</Text>
              </div>
            </div>
            <div style={{ padding: 0 }}>
              <ActionIcon
                variant="transparent"
                // disabled
                style={{
                  height: "100%",
                  borderLeftColor: "white",
                }}
                radius={0}
                size={30}
              >
                <IconEdit style={{ marginLeft: 10 }} />
              </ActionIcon>
            </div>
          </CardSection>
        </Card>
      );

    default:
      break;
  }
}
