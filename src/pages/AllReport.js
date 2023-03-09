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
} from "@mantine/core";
import React from "react";
import {
  IconLock,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconHome2,
  IconSearch,
  IconCross,
  IconX,
  IconFilter,
  IconCalendar,
} from "@tabler/icons";
import axios from "axios";
import CustomDiv from "../components/CustomDiv";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../utils/Context";
import { Carousel } from "@mantine/carousel";
import { motion } from "framer-motion";
import CustomMenu from "../components/CustomMenu";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  input: {
    width: 400,
  },

  box: {
    width: "80%",
    boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
    backgroundColor: theme.colors.gray[0],
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    border: "0.01px solid rgba(0,0,0,0.3)",
    marginBottom: 10,
    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

function AllReport() {
  const { userDetail, upcomingTrips } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = React.useState(1);
  const navigate = useNavigate();

  const pageLoaded = React.useCallback(
    (response) => {
      setPageLoading(false);
    },
    [pageLoading, upcomingTrips, userDetail]
  );

  if (pageLoading && upcomingTrips && userDetail) {
    pageLoaded();
  }

  const MotionBox = motion(Box);

  const largeScreen = useMediaQuery("(min-width: 800px)");

  return !pageLoading ? (
    <>
      <Flex gap="md" direction="column" wrap="wrap" sx={{ marginBottom: 30 }}>
        <Title order={3}>Report</Title>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Input
            value={searchTerm}
            className={classes.input}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<IconSearch size="1rem" />}
            placeholder="Start typing to search..."
            rightSection={
              searchTerm === "" ? null : (
                <Tooltip
                  label="Clear Input"
                  position="top-end"
                  withArrow
                  onClick={() => setSearchTerm("")}
                >
                  <div>
                    <IconX
                      size="1rem"
                      style={{
                        display: "block",
                        opacity: 0.5,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Tooltip>
              )
            }
          />
          <div>
            <CustomMenu />
          </div>

          <Modal
            opened={modalOpened}
            onClose={close}
            title="Filters"
            // centered
          >
            <div className={classes.Textbox}>
              <Text c="dimmed">Destination</Text>
              <TextInput
                // onChange={(event) => setDest(event.currentTarget.value)}
                // value={dest}
                rightSection={
                  <ActionIcon
                  // disabled={dest ? false : true}
                  // onClick={() => setDest("")}
                  >
                    <IconX />
                  </ActionIcon>
                }
              />
            </div>
            <div className={classes.Textbox}>
              <Text c="dimmed">Source</Text>
              <TextInput
                // onChange={(event) => setSrc(event.currentTarget.value)}
                // value={src}
                rightSection={
                  <ActionIcon
                  // disabled={src ? false : true}
                  // onClick={() => setSrc("")}
                  >
                    <IconX />
                  </ActionIcon>
                }
              />
            </div>
            <div className={classes.Textbox}>
              <Text c="dimmed">Date</Text>
              <DatePicker
                placeholder="Select from Calendar"
                minDate={dayjs(new Date()).toDate()}
                maxDate={null}
                // value={dt}
                inputFormat="YYYY-MM-DD"
                clearable
                // onChange={(value) => setDt(dayjs(value).format("YYYY-MM-DD"))}
                // rightSection={
                //   dt ? (
                //     <ActionIcon onClick={() => setDt(null)}>
                //       <IconX />
                //     </ActionIcon>
                //   ) : (
                //     <IconCalendar size={20} />
                //   )
                // }
              />
            </div>
          </Modal>
          <Button onClick={open} variant="outline">
            Filter
          </Button>
          <Button onClick={open}>+ Create New Report</Button>
          <Text sx={{ marginLeft: "auto", marginRight: 30 }}>
            Showing 10 / 256 total results
          </Text>
        </div>
      </Flex>
      <Divider />
      <ScrollArea
        h={"auto"}
        style={{
          paddingTop: 20,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
          <Center>
            <MotionBox
              whileHover={{ scale: 1.02 }}
              key={id}
              className={classes.box}
              onClick={() => navigate(`/report-detail/${id}`)}
            >
              Box {id}
            </MotionBox>
          </Center>
        ))}
      </ScrollArea>
      <Center>
        <Pagination value={activePage} onChange={setPage} total={10} />
      </Center>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default AllReport;
