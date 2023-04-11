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
  Input,
  Tooltip,
  Menu,
  Box,
  Modal,
  Chip,
  ActionIcon,
  Pagination,
  Group,
} from "@mantine/core";
import React from "react";
import { IconSearch, IconX } from "@tabler/icons";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../utils/Context";
import { motion } from "framer-motion";
import CustomMenu from "../components/CustomMenu";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  actionWrapper: {
    // backgroundColor: "#A4ABBD",
    position: "sticky",
    top: 60,
    // height: 500,
    padding: 10,
    margin: 10,
  },
}));

function Record() {
  const [records, setRecords] = React.useState(false);
  const { classes } = useStyles();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = React.useState(1);
  const { id } = useParams();

  const getRecord = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/record/`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
          params: {
            id: id, //in mode 0 send id
            mode: 0,
          },
        }
      );
      setRecords(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const deleteRecord = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_ROOT_URL}/api/record/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
        data: {
          id: id,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  React.useEffect(() => {
    getRecord();
  }, []);

  const pageLoaded = React.useCallback(
    (response) => {
      setPageLoading(false);
    },
    [pageLoading, getRecord]
  );

  if (pageLoading && getRecord) {
    pageLoaded();
  }

  const navigate = useNavigate();

  const MotionBox = motion(Box);

  const largeScreen = useMediaQuery("(min-width: 800px)");

  // let str = JSON.parse(records?.fields?.TABLE[0]);

  return !pageLoading ? (
    <>
      <Flex
        gap="md"
        direction="column"
        wrap="wrap"
        sx={{ padding: 20, marginBottom: 30 }}
      >
        <Title order={3}>Lorem Ipsum Dolor</Title>
        <Divider />
        <Grid gutter={"xl"} columns={3}>
          <Grid.Col md={2}>{/* <Text>{str}</Text> */}</Grid.Col>
          <Divider orientation="vertical" />
          <Grid.Col md={"auto"} sx={{ position: "relative" }}>
            <div className={classes.actionWrapper}>
              <Flex gap="md" direction="column">
                <Button
                  onClick={() =>
                    navigate("/generate-report", {
                      state: { TABLE: records.fields.TABLE },
                    })
                  }
                >
                  View Entries / Generate Report
                </Button>
                <Button
                  onClick={() =>
                    navigate("/new-entry", {
                      state: { TABLE: records.fields.TABLE },
                    })
                  }
                >
                  New Entry
                </Button>
                <Button onClick={() => navigate("/bulk-upload")}>
                  Bulk Upload
                </Button>
                <Button bg={"red"} onClick={open}>
                  Delete Report
                </Button>
                <Modal
                  opened={opened}
                  onClose={close}
                  size="auto"
                  title="Confirm Action"
                >
                  <Text>
                    Are you sure you want to delete this report? This action
                    cannot be undone.
                  </Text>

                  <Group mt="xl" position="right" onClick={close}>
                    <Button variant="outline" onClick={close}>
                      No
                    </Button>
                    <Button onClick={() => deleteRecord()}>Yes</Button>
                  </Group>
                </Modal>
              </Flex>
            </div>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default Record;
