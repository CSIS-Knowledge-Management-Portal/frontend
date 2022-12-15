import {
  Text,
  createStyles,
  Grid,
  Button,
  Paper,
  TextInput,
  ActionIcon,
  Chip,
  Divider,
  Modal,
  Center,
  Loader,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar, IconX } from "@tabler/icons";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomDiv from "../components/CustomDiv";
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "60%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "70%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "85%",
    },
  },

  button: {
    width: "100%",
    height: 80,
    borderRadius: 20,
    marginTop: 20,
    backgroundImage: "linear-gradient(to right, #FD008C, #7901FF, #0097FF)",
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 70,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 60,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 50,
    },
  },

  sidePanel: {
    position: "sticky",
    top: 80,
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      marginTop: 20 * 0.85,
      top: 80 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      marginTop: 20 * 0.7,
      top: 80 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: "none",
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
  form: {
    width: "100%",
    marginTop: 20,
  },

  chip: {
    marginTop: 10,
  },

  mobileFilter: {
    display: "none",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "block",
    },
  },
}));

function Homepage() {
  const { userDetail } = React.useContext(UserContext);
  const { classes } = useStyles();
  let navigate = useNavigate();
  const [posts, setPosts] = React.useState(null);
  // const [email, setEmail] = React.useState();
  const [dest, setDest] = React.useState("");
  const [src, setSrc] = React.useState("");
  const [dt, setDt] = React.useState("");
  const [opened, setOpened] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getAllPosts();
  }, [setPosts]);

  const getAllPosts = React.useCallback(
    async (response) => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/trip/all-active`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setPosts(data.data);

      data.data?.map(async (item) => {
        if (new Date(item.departure_date) < new Date()) {
          await axios({
            method: "post",
            url: `${process.env.REACT_APP_ROOT_URL}/api/trip/done`,
            headers: { Authorization: localStorage.getItem("SavedToken") },
            data: {
              trip_id: item.id,
            },
          });
        }
      });
    },
    [posts]
  );

  if (pageLoading && posts && userDetail) {
    setPageLoading(false);
  }

  const Filter = async () => {
    setLoading(true);
    setOpened(false);
    const data = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ROOT_URL}/api/trip/all-active?${
        dest.length > 0 ? "dest=" + dest + "&" : ""
      }${src.length > 0 ? "src=" + src + "&" : ""}${
        dt.length > 0 ? "dt=" + dt : ""
      }`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
    setPosts(data.data);
    setLoading(false);
  };

  return !pageLoading ? (
    <>
      <Button variant="outline" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Text className={classes.pageTitle}>All Posts</Text>
      <Grid className={classes.wrapper} gutter={20}>
        <Grid.Col lg={4}>
          <Paper
            shadow={"md"}
            p="lg"
            style={{ width: "100%" }}
            className={classes.sidePanel}
          >
            <div className={classes.Textbox}>
              <Text c="dimmed">Destination</Text>
              <TextInput
                onChange={(event) => setDest(event.currentTarget.value)}
                value={dest}
                rightSection={
                  <ActionIcon
                    disabled={dest ? false : true}
                    onClick={() => setDest("")}
                  >
                    <IconX />
                  </ActionIcon>
                }
              />
              <Chip.Group
                className={classes.chip}
                value={dest}
                onChange={setDest}
              >
                <Chip value="Campus">Campus</Chip>
                <Chip value="Airport">Airport</Chip>
                <Chip value="F3">F3</Chip>
                <Chip value="BnB">BnB</Chip>
                <Chip value="Railway Stn">Rlw Stn</Chip>
              </Chip.Group>
            </div>
            <div className={classes.Textbox}>
              <Text c="dimmed">Source</Text>
              <TextInput
                onChange={(event) => setSrc(event.currentTarget.value)}
                value={src}
                rightSection={
                  <ActionIcon
                    disabled={src ? false : true}
                    onClick={() => setSrc("")}
                  >
                    <IconX />
                  </ActionIcon>
                }
              />
              <Chip.Group
                className={classes.chip}
                value={src}
                onChange={setSrc}
              >
                <Chip value="Campus">Campus</Chip>
                <Chip value="Airport">Airport</Chip>
                <Chip value="F3">F3</Chip>
                <Chip value="BnB">BnB</Chip>
                <Chip value="Railway Stn">Rlw Stn</Chip>
              </Chip.Group>
            </div>
            <div className={classes.Textbox}>
              <Text c="dimmed">Date</Text>
              <DatePicker
                placeholder="Select from Calendar"
                minDate={dayjs(new Date()).toDate()}
                maxDate={null}
                value={dt}
                inputFormat="YYYY-MM-DD"
                clearable
                onChange={(value) => setDt(dayjs(value).format("YYYY-MM-DD"))}
                rightSection={
                  dt ? (
                    <ActionIcon onClick={() => setDt(null)}>
                      <IconX />
                    </ActionIcon>
                  ) : (
                    <IconCalendar size={20} />
                  )
                }
              />
            </div>
            <Divider />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button variant="outline" onClick={() => Filter()}>
                Apply Filters
              </Button>
            </div>
          </Paper>
          <Button
            variant="subtle"
            className={classes.mobileFilter}
            onClick={() => setOpened(true)}
          >
            Apply Filters
          </Button>
        </Grid.Col>
        <Grid.Col
          lg={7}
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {!loading ? (
            posts?.length > 0 ? (
              posts?.map((item, id) =>
                item.creator.email === userDetail?.email ? null : (
                  <CustomDiv key={id} type={1} item={item} />
                )
              )
            ) : (
              <BlankSVG
                width={"50%"}
                height={"50%"}
                style={{
                  alignSelf: "center",
                  marginTop: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            )
          ) : (
            <Center style={{ width: "100%", height: "100%" }}>
              <Loader />
            </Center>
          )}
        </Grid.Col>
        <Grid.Col lg={1} />
      </Grid>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Filters"
      >
        <div className={classes.Textbox}>
          <Text c="dimmed">Destination</Text>
          <TextInput
            onChange={(event) => setDest(event.currentTarget.value)}
            value={src}
            rightSection={
              <ActionIcon
                disabled={src ? false : true}
                onClick={() => setSrc("")}
              >
                <IconX />
              </ActionIcon>
            }
          />
          <Chip.Group className={classes.chip} value={src} onChange={setSrc}>
            <Chip value="Campus">Campus</Chip>
            <Chip value="Airport">Airport</Chip>
            <Chip value="F3">F3</Chip>
            <Chip value="BnB">BnB</Chip>
            <Chip value="Railway Stn">Rlw Stn</Chip>
          </Chip.Group>
        </div>
        <div className={classes.Textbox}>
          <Text c="dimmed">Source</Text>
          <TextInput
            onChange={(event) => setSrc(event.currentTarget.value)}
            value={dest}
            rightSection={
              <ActionIcon
                disabled={dest ? false : true}
                onClick={() => setDest("")}
              >
                <IconX />
              </ActionIcon>
            }
          />
          <Chip.Group className={classes.chip} value={dest} onChange={setDest}>
            <Chip value="Campus">Campus</Chip>
            <Chip value="Airport">Airport</Chip>
            <Chip value="F3">F3</Chip>
            <Chip value="BnB">BnB</Chip>
            <Chip value="Railway Stn">Rlw Stn</Chip>
          </Chip.Group>
        </div>
        <div className={classes.Textbox}>
          <Text c="dimmed">Date</Text>
          <DatePicker
            placeholder="Select from Calendar"
            minDate={dayjs(new Date()).toDate()}
            maxDate={null}
            defaultValue={dt}
            inputFormat="YYYY-MM-DD"
            onChange={(value) => setDt(dayjs(value).format("YYYY-MM-DD"))}
            rightSection={<IconCalendar size={20} />}
          />
        </div>
        <Divider />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Button variant="outline" onClick={() => Filter()}>
            Apply Filters
          </Button>
        </div>
      </Modal>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default Homepage;
