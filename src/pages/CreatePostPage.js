import {
  Text,
  createStyles,
  TextInput,
  ActionIcon,
  Chip,
  Textarea,
  Button,
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
  const [member, setMember] = React.useState([]);

  let navigate = useNavigate();

  const { state } = useLocation();

  React.useEffect(() => {
    const User = async () => {
      const data = await axios.get("http://localhost:8000/user/", {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setOrganiser(data.data.email);
    };
    User();

    if (state?.flag) {
      setSource(state.data.source);
      setDestination(state.data.destination);
      setDate(new Date(state.data.departure_date));
      setLeavingTime(new Date());
      setWaitingTime(state.data.waiting_time);
      setDetails(state.data.details);
      setOrganiser(state.data.creator.email);
      let members = [];
      state.data.passengers.map((item, id) => members.push(item.email));

      setMember(members.slice(1, members.length));
    }
  }, []);

  const Update = async () => {
    const data = await axios({
      method: "patch",
      url: `http://localhost:8000/api/trip/update/${state?.data.id}`,
      headers: { Authorization: localStorage.getItem("SavedToken") },
      data: {
        source: source,
        destination: destination,
        departure_date: date,
        departure_time: leavingTime,
        waiting_time: waitingTime,
        details: details,
      },
    });
    navigate("/upcoming-trips");
  };

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
              onClick={() => console.log("hello")}
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
              onClick={() => console.log("hello")}
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
          defaultValue={date}
          inputFormat="YYYY-MM-DD"
          onChange={(value) => setDate(dayjs(value).format("YYYY-MM-DD"))}
          rightSection={<IconCalendar size={20} />}
        />
        <TimeInput
          className={classes.form}
          onChange={(value) => setLeavingTime(dayjs(value).format("HH:mm:ss"))}
          label="Leaving time"
          format="24"
          icon={<IconClock size={16} />}
          required
          defaultValue={leavingTime}
          // defaultValue={
          //   new Date(
          //     dayjs(state.data.departure_date).format("MMMM D, YYYY") +
          //       state.data.departure_time
          //   )
          // }
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
          required
          value={details}
          autosize
          minRows={2}
          maxRows={4}
        />
        <TextInput
          className={classes.form}
          label="Organiser"
          value={organiser}
          required
          disabled
        />
        {state?.flag ? null : (
          <Textarea
            className={classes.form}
            placeholder="Members Email separated by comma"
            label="Members"
            onChange={(event) => setMember(event.currentTarget.value)}
            required
            value={member}
            autosize
            minRows={2}
            maxRows={4}
          />
        )}
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          onClick={() =>
            state?.flag
              ? Update()
              : navigate("/choose-vendor", {
                  state: {
                    source: source,
                    destination: destination,
                    departure_date: date,
                    departure_time: leavingTime,
                    waiting_time: waitingTime,
                    details: details,
                    passengers: member.toString(),
                  },
                })
          }
        >
          {state?.flag ? "Update" : "Next"}
        </Button>
      </div>
    </>
  );
}

export default CreatePostPage;
