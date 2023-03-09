import {
  Text,
  createStyles,
  TextInput,
  Button,
  Avatar,
  Grid,
  Divider,
  Dialog,
  Loader,
  Center,
  Collapse,
  ScrollArea,
  NavLink,
  Select,
  Title,
  Flex,
} from "@mantine/core";
import React from "react";
import {
  IconLock,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconHome2,
} from "@tabler/icons";
import axios from "axios";
import CustomDiv from "../components/CustomDiv";
import { useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../utils/Context";
import { Carousel } from "@mantine/carousel";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  Title: {
    fontSize: 36,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 36 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 36 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 20,
      textAlign: "left",
    },
  },
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

  carouselItem: {
    backgroundColor: theme.colors.customBlue[0],
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    height: 200,
    marginTop: "auto",
    marginBottom: "auto",
    boxShadow: "4px 4px 5px rgba(0,0,0,0.3)",
  },
}));

function Dashboard() {
  const { userDetail, upcomingTrips } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [phone, setPhone] = React.useState(userDetail?.phone);
  const [error, setError] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [accountToggle, setAccountToggle] = React.useState(false);

  const Phone = async () => {
    if (/^[1-9][0-9]{9}$/.test(phone)) {
      setError(false);
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_ROOT_URL}/user/phone`,
        headers: { Authorization: localStorage.getItem("SavedToken") },
        data: {
          phone: phone,
        },
      });

      setOpened(true);
      setTimeout(() => {
        setOpened(false);
      }, 3000);
    } else {
      setError(true);
    }
  };

  const pageLoaded = React.useCallback(
    (response) => {
      setPageLoading(false);
    },
    [pageLoading, upcomingTrips, userDetail]
  );

  if (pageLoading && upcomingTrips && userDetail) {
    pageLoaded();
  }

  const MotionComp = motion(Carousel.Slide);

  const largeScreen = useMediaQuery("(min-width: 800px)");

  return !pageLoading ? (
    <>
      {[1, 2, 3, 4, 5, 6].map((item, id) => (
        <Flex
          key={id}
          gap="md"
          direction="column"
          wrap="wrap"
          sx={{ padding: 20, marginBottom: 30 }}
        >
          <Title order={3}>Report</Title>
          <Carousel
            height={210}
            slideSize="33.333333%"
            // loop
            align="start"
            slideGap={"lg"}
            controlSize={34}
            slidesToScroll={1}
            sx={{}}
          >
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              1
            </MotionComp>
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              2
            </MotionComp>
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              3
            </MotionComp>
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              4
            </MotionComp>
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              5
            </MotionComp>
            <MotionComp
              whileHover={{ scale: 1.05 }}
              className={classes.carouselItem}
            >
              6
            </MotionComp>
          </Carousel>
        </Flex>
      ))}
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default Dashboard;
