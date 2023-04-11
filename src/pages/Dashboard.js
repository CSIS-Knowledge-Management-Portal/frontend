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
import Container from "../components/Container";
import { useNavigate } from "react-router";

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

  Button: {
    margin: 8,
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
  const { recordTypes } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [error, setError] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [accountToggle, setAccountToggle] = React.useState(false);
  const navigate = useNavigate();

  const pageLoaded = React.useCallback(
    (response) => {
      setPageLoading(false);
    },
    [pageLoading, recordTypes]
  );

  if (pageLoading && recordTypes) {
    pageLoaded();
  }

  const MotionComp = motion(Carousel.Slide);

  const largeScreen = useMediaQuery("(min-width: 800px)");

  return !pageLoading ? (
    <Container>
      <Flex justify={"end"}>
        <Button
          className={classes.Button}
          onClick={() => navigate("/new-recordtype")}
        >
          Create New Record Type
        </Button>
      </Flex>
      <Divider />
      {recordTypes?.map((item, id) => (
        <Flex
          key={id}
          gap="md"
          direction="column"
          wrap="wrap"
          sx={{ marginBottom: 30 }}
        >
          <Title order={3}>{item?.name}</Title>

          {item?.records.length > 0 ? (
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
              {item?.records.map((item, id) => (
                <MotionComp
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  className={classes.carouselItem}
                  onClick={() => navigate(`/record/${item.id}`)}
                >
                  {item.name}
                </MotionComp>
              ))}
            </Carousel>
          ) : (
            <Text>Nothing here...</Text>
          )}
        </Flex>
      ))}
    </Container>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default Dashboard;
