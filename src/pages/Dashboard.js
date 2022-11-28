import {
  Text,
  createStyles,
  TextInput,
  Button,
  Avatar,
  Grid,
  Divider,
  Dialog,
} from "@mantine/core";
import React from "react";
import { IconLock, IconEdit } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import axios from "axios";
import CustomDiv from "../components/CustomDiv";
import { useMediaQuery } from "@mantine/hooks";

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

  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
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

  profile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      flexDirection: "row",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
    },
  },

  form: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "80%",
      marginRight: 0,
      marginLeft: "auto",
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  avatar: {
    marginTop: 30,
    height: 216,
    width: 216,
    borderRadius: 999,
  },

  button: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 70,
    borderRadius: 20,
    marginTop: 30,
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 60,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 50,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 45,
    },
  },
}));

function Dashboard() {
  const { classes } = useStyles();
  const [userDetail, setUserDetail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [error, setError] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [upcomingPosts, setUpcomingPosts] = React.useState(null);

  const Phone = async () => {
    if (/^[1-9][0-9]{9}$/.test(phone)) {
      setError(false);
      const data = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_ROOT_URL}/user/phone`,
        headers: { Authorization: localStorage.getItem("SavedToken") },
        data: {
          phone: phone,
        },
      });
      console.log(data.data);
      setOpened(true);
      setTimeout(() => {
        setOpened(false);
      }, 3000);
    } else {
      setError(true);
    }
  };

  let navigate = useNavigate();
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  console.log(userDetail);

  React.useEffect(() => {
    const User = async () => {
      console.log("sent");
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/user/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setUserDetail(data.data);
      setPhone(data.data.phone);
    };
    User();

    const UpcomingTrips = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/api/trip/upcoming`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setUpcomingPosts(data.data);
    };
    UpcomingTrips();
  }, []);

  const ToPast = async () => {
    upcomingPosts?.map((item, id) => {
      if (new Date(item.departure_date) < new Date()) {
        ToPastCall(item.id);
      } else console.log(item.departure_date, " is greater than ", new Date());
    });
    // window.location.reload();
  };

  const ToPastCall = async (id) => {
    const data = await axios({
      method: "post",
      url: `${process.env.REACT_APP_ROOT_URL}/api/trip/done`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        trip_id: id,
      },
    });
    console.log(data.data);
  };

  if (upcomingPosts) ToPast();

  return (
    <>
      <Grid gutter="xl" columns={15}>
        <Grid.Col sm={15} lg={4} className={classes.wrapper}>
          <div style={{ display: "inline-block" }}>
            <Text
              className={classes.Title}
              variant="gradient"
              gradient={{ from: "blue.5", to: "pink.7", deg: 0 }}
            >
              Hi, {userDetail?.name}!
            </Text>
          </div>
          <div className={classes.profile}>
            <Avatar className={classes.avatar} src={userDetail?.pfp} />
            <div style={{ width: "90%" }}>
              <TextInput
                className={classes.form}
                label="Name"
                value={userDetail?.name}
                readOnly
                rightSection={<IconLock size={20} />}
              />
              <TextInput
                className={classes.form}
                label="Email"
                value={userDetail?.email}
                readOnly
                rightSection={<IconLock size={20} />}
              />

              <TextInput
                label="Phone Number"
                className={classes.form}
                value={phone}
                onChange={(event) => setPhone(event.currentTarget.value)}
                required
                error={error ? "Invalid Phone" : null}
                rightSection={<IconEdit size={20} />}
              />

              <Button
                color={"customDark.0"}
                variant="outline"
                className={classes.button}
                onClick={() => Phone()}
                disabled={userDetail?.phone != phone ? false : true}
                type="submit"
              >
                Update
              </Button>
              <Dialog
                withCloseButton={false}
                opened={opened}
                onClose={() => setOpened(false)}
                position={{ bottom: 20, right: 100 }}
              >
                <Text color={"white"} style={{ textAlign: "center" }}>
                  Phone Number Updated Successfully 👍
                </Text>
              </Dialog>
            </div>
          </div>
        </Grid.Col>
        <Divider
          orientation="vertical"
          style={{ display: largeScreen ? "block" : "none" }}
        />
        <Grid.Col
          sm={7}
          lg={5}
          className={classes.wrapper}
          style={{ marginLeft: largeScreen ? 50 : 0 }}
        >
          <div style={{ display: "inline-block" }}>
            <Text className={classes.pageTitle}>TRIPS</Text>
          </div>
          <CustomDiv type={3} />
          <CustomDiv type={8} />
        </Grid.Col>
        <Grid.Col
          sm={8}
          lg={5}
          className={classes.wrapper}
          style={{ marginLeft: largeScreen ? 20 : 0 }}
        >
          <div style={{ display: "inline-block" }}>
            <Text className={classes.pageTitle}>POSTS</Text>
          </div>
          <CustomDiv type={2} />
          <CustomDiv type={9} />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Dashboard;
