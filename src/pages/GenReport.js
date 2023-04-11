import {
  Text,
  createStyles,
  TextInput,
  Button,
  Divider,
  Loader,
  Center,
  Select,
  Title,
  Flex,
  Input,
  Tooltip,
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
import { useLocation, useNavigate } from "react-router";
import CustomTable from "../components/CustomTable";
import data from "../data/tableData";
import * as XLSX from "xlsx/xlsx.mjs";

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

function GenReport() {
  const { userDetail, upcomingTrips } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [columnModalOpened, setColumnModalOpened] = React.useState(false);
  const [value, setValue] = React.useState(["react"]);
  const [activePage, setPage] = React.useState(1);
  const [template, setTemplate] = React.useState(null);
  const { state } = useLocation();
  const { TABLE } = state;

  const download_report = () => {
    var table_elt = document.getElementById("report-generate-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    // XLSX.utils.sheet_add_aoa(
    //   ws,
    //   [[], ["Created " + new Date().toISOString()]],
    //   {
    //     origin: -1,
    //   }
    // );
    XLSX.writeFile(workbook, "Report.xlsx");
  };

  const navigate = useNavigate();
  console.log(value);
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
      <Flex gap="md" direction="column" wrap="wrap" sx={{ padding: 10 }}>
        <Title order={3}>Generate Report</Title>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Select
            searchable
            nothingFound="No options"
            clearable
            placeholder="Select Template"
            value={template}
            onChange={setTemplate}
            data={[
              { value: "Lorem", label: "Lorem" },
              { value: "Ipsum", label: "Ipsum" },
              { value: "Dolor", label: "Dolor" },
            ]}
          />
          <Button
            disabled={template === null ? true : false}
            onClick={() => setColumnModalOpened(true)}
          >
            Select Columns
          </Button>

          <Modal
            opened={columnModalOpened}
            onClose={() => setColumnModalOpened(false)}
            title="Filters"
            // centered
          >
            <Chip.Group multiple value={value} onChange={setValue}>
              <Group position="center">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (item, id) => (
                    <Chip key={id} value={item}>
                      Chip {item}
                    </Chip>
                  )
                )}
              </Group>
            </Chip.Group>
          </Modal>
        </div>
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
          <Button onClick={() => download_report()}>Generate Report</Button>
          <Text sx={{ marginLeft: "auto", marginRight: 30 }}>
            Showing 10 / 256 total results
          </Text>
        </div>

        <Divider />
        <div
          style={{
            paddingTop: 20,
          }}
        >
          <CustomTable data={TABLE} />
        </div>
        <Center>
          <Pagination value={activePage} onChange={setPage} total={10} />
        </Center>
      </Flex>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default GenReport;
