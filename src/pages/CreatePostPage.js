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
import { useNavigate } from "react-router-dom";

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
  const [valueFrom, setValueFrom] = React.useState("");
  const [valueTo, setValueTo] = React.useState("");
  const [date, setDate] = React.useState("");
  const [member, setMember] = React.useState([
    "f20202231@hyderabad.bits-pilani.ac.in",
  ]);

  let navigate = useNavigate();

  return (
    <>
      <Button variant="subtle" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Create New Post</Text>
        <TextInput
          className={classes.form}
          placeholder="From"
          label="Source"
          onChange={(event) => setValueFrom(event.currentTarget.value)}
          value={valueFrom}
          withAsterisk
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
          value={valueFrom}
          onChange={setValueFrom}
        >
          <Chip value="campus">Campus</Chip>
          <Chip value="airport">Airport</Chip>
          <Chip value="f3">F3</Chip>
          <Chip value="bnb">BnB</Chip>
          <Chip value="rlwstn">Rlw Stn</Chip>
        </Chip.Group>
        <TextInput
          className={classes.form}
          placeholder="To"
          label="Destination"
          onChange={(event) => setValueTo(event.currentTarget.value)}
          value={valueTo}
          withAsterisk
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
          value={valueTo}
          onChange={setValueTo}
        >
          <Chip value="campus">Campus</Chip>
          <Chip value="airport">Airport</Chip>
          <Chip value="f3">F3</Chip>
          <Chip value="bnb">BnB</Chip>
          <Chip value="rlwstn">Rlw Stn</Chip>
        </Chip.Group>

        <DatePicker
          className={classes.form}
          placeholder="Select from Calendar"
          label="Date"
          withAsterisk
          onChange={setDate}
          rightSection={<IconCalendar size={20} />}
        />
        <TimeInput
          className={classes.form}
          defaultValue={new Date()}
          label="Leaving time"
          format="12"
          amLabel="am"
          pmLabel="pm"
          icon={<IconClock size={16} />}
          withAsterisk
        />
        <TimeInput
          className={classes.form}
          clearable
          label="Waiting time"
          format="24"
          icon={<IconClock size={16} />}
          withAsterisk
        />
        <Textarea
          className={classes.form}
          placeholder="Your comment"
          label="Additional Info"
          withAsterisk
          autosize
          minRows={2}
          maxRows={4}
        />
        <TextInput
          className={classes.form}
          placeholder="To"
          label="Members"
          onChange={(event) => setValueTo(event.currentTarget.value)}
          value={member}
          withAsterisk
          disabled
          rightSection={
            <ActionIcon
              style={{
                borderLeftColor: "white",
                borderWidth: 1,
              }}
              onClick={() => console.log("hello")}
            >
              <IconPlus size={20} />
            </ActionIcon>
          }
        />
        <Button
          color={"customDark.0"}
          variant="outline"
          className={classes.button}
          onClick={() => navigate("/choose-vendor")}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default CreatePostPage;
