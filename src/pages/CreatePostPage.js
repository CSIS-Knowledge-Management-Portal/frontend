import {
  Text,
  createStyles,
  TextInput,
  ActionIcon,
  Chip,
  Textarea,
  Button,
  Autocomplete,
  NumberInput,
  Dialog,
} from "@mantine/core";
import React from "react";
import { IconMapPin, IconCalendar, IconPlus, IconClock } from "@tabler/icons";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

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
    marginLeft: "auto",
    marginRight: "auto",
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

  form: {
    width: "100%",
    marginTop: 20,
  },

  chip: {
    marginTop: 10,
  },
  button: {
    width: "50%",
    alignSelf: "center",
    height: 80,
    borderRadius: 20,
    marginTop: 20,
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
}));

function CreatePostPage() {
  const { classes } = useStyles();
  const [source, setSource] = React.useState();
  const [destination, setDestination] = React.useState();
  const [date, setDate] = React.useState();
  const [leavingTime, setLeavingTime] = React.useState();
  const [waitingTime, setWaitingTime] = React.useState();
  const [details, setDetails] = React.useState();
  const [organiser, setOrganiser] = React.useState();
  const [noOfMembers, setNoOfMembers] = React.useState(0);
  const [member, setMember] = React.useState(new Set());
  const [allUsers, setAllUsers] = React.useState();
  const [error, setError] = React.useState(false);

  let navigate = useNavigate();

  const { state } = useLocation();

  React.useEffect(() => {
    const User = async () => {
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/user/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setOrganiser(data.data.email);
      member.add(data.data.email);
      setMember(member);
    };
    User();

    if (state?.flag) {
      console.log(state);
      setSource(state.data.source);
      setDestination(state.data.destination);
      var parts = state.data.departure_date.split("-");
      setDate(new Date(parts[0], parts[1] - 1, parts[2]));
      // setLeavingTime(
      //   new Date(state.data.departure_date + "T" + state.data.departure_time)
      // );
      var time = state.data.departure_time.split(":");
      setLeavingTime(
        new Date(parts[0], parts[1] - 1, parts[2], time[0], time[1], time[2])
      );
      setWaitingTime(state.data.waiting_time);
      setDetails(state.data.details);
      setOrganiser(state.data.creator.email);
      let members = [];
      state.data.passengers.map((item, id) => members.push(item.email));

      setMember(members.slice(1, members.length));
    }

    const AllUser = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_ROOT_URL}/user/all`,
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      setAllUsers(data?.data?.map((item) => ({ ...item, value: item.email })));
    };
    AllUser();
  }, [noOfMembers]);

  const Create = async () => {
    if (
      source &&
      destination &&
      date &&
      leavingTime &&
      waitingTime &&
      source != destination
    ) {
      setError(false);
      navigate("/choose-vendor", {
        state: {
          source: source,
          destination: destination,
          departure_date: date,
          departure_time: dayjs(leavingTime).format("HH:mm:ss"),
          waiting_time: waitingTime,
          details: details,
          passengers: [...member].join(","),
          noOfMembers: noOfMembers + 1,
        },
      });
    } else {
      setError(true);
    }
  };

  const Update = async () => {
    console.log(dayjs(leavingTime).format("HH:mm:ss"));
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_ROOT_URL}/api/trip/update/${state?.data.id}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        source: source,
        destination: destination,
        departure_date: date,
        departure_time: dayjs(leavingTime).format("HH:mm:ss"),
        waiting_time: waitingTime,
        details: details,
      },
    });
    navigate("/upcoming-trips");
  };

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showposition);
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }

  // function showposition(postion) {
  //   console.log("latitude:", postion.coords.latitude);
  //   console.log("longitude:", postion.coords.longitude);
  // }

  return (
    <>
      <Button variant="subtle" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>
          {state?.flag ? "Update/View Post" : "Create New Post"}
        </Text>
        <TextInput
          className={classes.form}
          placeholder="From"
          label="Source"
          onChange={(event) => setSource(event.currentTarget.value)}
          value={source}
          required
          rightSection={
            <ActionIcon
              style={{
                borderLeftColor: "white",
                borderWidth: 1,
              }}
              // onClick={() => console.log("hello")}
            >
              <IconMapPin size={20} />
            </ActionIcon>
          }
        />
        <Chip.Group
          className={classes.chip}
          value={source}
          onChange={setSource}
        >
          <Chip value="Campus">Campus</Chip>
          <Chip value="Airport">Airport</Chip>
          <Chip value="F3">F3</Chip>
          <Chip value="BnB">BnB</Chip>
          <Chip value="Railway Stn">Rlw Stn</Chip>
        </Chip.Group>
        <TextInput
          className={classes.form}
          placeholder="To"
          label="Destination"
          onChange={(event) => setDestination(event.currentTarget.value)}
          value={destination}
          required
          rightSection={
            <ActionIcon
              style={{
                borderLeftColor: "white",
                borderWidth: 1,
              }}
              // onClick={() => getLocation()}
            >
              <IconMapPin size={20} />
            </ActionIcon>
          }
        />
        <Chip.Group
          className={classes.chip}
          value={destination}
          onChange={setDestination}
        >
          <Chip value="Campus">Campus</Chip>
          <Chip value="Airport">Airport</Chip>
          <Chip value="F3">F3</Chip>
          <Chip value="BnB">BnB</Chip>
          <Chip value="Railway Stn">Rlw Stn</Chip>
        </Chip.Group>

        <DatePicker
          className={classes.form}
          placeholder="Select from Calendar"
          minDate={dayjs(new Date()).toDate()}
          maxDate={null}
          label="Date"
          required
          value={date}
          inputFormat="YYYY-MM-DD"
          onChange={(value) => setDate(dayjs(value).format("YYYY-MM-DD"))}
          rightSection={<IconCalendar size={20} />}
        />
        <TimeInput
          className={classes.form}
          value={leavingTime}
          onChange={setLeavingTime}
          label="Leaving time"
          format="24"
          icon={<IconClock size={16} />}
          required
        />
        <TextInput
          className={classes.form}
          onChange={(event) => setWaitingTime(event.currentTarget.value)}
          label="Waiting time"
          rightSection={<IconClock size={16} />}
          value={waitingTime}
          required
        />
        <Textarea
          className={classes.form}
          placeholder="Your comment"
          label="Additional Info"
          onChange={(event) => setDetails(event.currentTarget.value)}
          value={details}
          autosize
          minRows={2}
          maxRows={4}
        />

        {allUsers && (
          <>
            <NumberInput
              defaultValue={noOfMembers + 1}
              min={1}
              placeholder="Members"
              onChange={(value) => {
                if (value - 1 < noOfMembers && value == member.size - 1)
                  member.delete([...member][member.size - 1]);
                setNoOfMembers(value - 1);
              }}
              className={classes.form}
              label="Choose members"
            />
            <TextInput className={classes.form} value={organiser} disabled />
            {[...Array(noOfMembers).keys()].map(() => (
              <Autocomplete
                placeholder="Type mail or name"
                className={classes.form}
                limit={3}
                onChange={(item) => setMember(member.add(item))}
                data={allUsers}
                filter={(value, item) =>
                  item?.value
                    .toLowerCase()
                    .includes(value.toLowerCase().trim()) ||
                  item?.first_name
                    .toLowerCase()
                    .includes(value.toLowerCase().trim())
                }
              />
            ))}
          </>
        )}
        <Dialog
          opened={error}
          withCloseButton
          onClose={() => setError(false)}
          size="lg"
          radius="md"
          position={{ left: 20, bottom: 20 }}
        >
          <Text
            size="md"
            color={"red"}
            style={{ marginBottom: 10 }}
            weight={500}
          >
            Error
          </Text>
          <Text size="sm" color={"red"} style={{ marginBottom: 10 }}>
            Please fill all required fields / Destination and source is same
          </Text>
        </Dialog>
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          disabled={error}
          onClick={() => (state?.flag ? Update() : Create())}
        >
          {state?.flag ? "Update" : "Next"}
        </Button>
      </div>
    </>
  );
}

export default CreatePostPage;
