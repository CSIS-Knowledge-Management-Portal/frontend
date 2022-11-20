import { Text, createStyles, TextInput, Button, Avatar } from "@mantine/core";
import React from "react";
import { IconLock, IconEdit } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";

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
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
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

  form: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  avatar: {
    marginTop: 30,
    height: 216,
    width: 216,
    borderRadius: 999,
  },

  button: {
    width: "50%",
    alignSelf: "center",
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

function MyAccountPage() {
  const { classes } = useStyles();
  const [phone, setPhone] = React.useState("9625697152");

  const form = useForm({
    initialValues: {
      phone: phone,
    },

    validate: {
      phone: (value) =>
        /^[1-9][0-9]{9}$/.test(value) ? null : "Invalid Phone",
    },
  });

  let navigate = useNavigate();
  return (
    <>
      <Button variant="subtle" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <div className={classes.wrapper}>
        <Text className={classes.pageTitle}>Tell me about myself</Text>
        <Avatar className={classes.avatar} />
        <TextInput
          className={classes.form}
          label="Name"
          value={"Aarush Sinha"}
          readOnly
          rightSection={<IconLock size={20} />}
        />
        <TextInput
          className={classes.form}
          label="Email"
          value={"f20202231@hyderabad.bits-pilani.ac.in"}
          readOnly
          rightSection={<IconLock size={20} />}
        />
        <form
          className={classes.form}
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput
            label="Phone Number"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
            required
            rightSection={<IconEdit size={20} />}
            {...form.getInputProps("phone")}
          />

          <Button
            color={"customDark.0"}
            variant="outline"
            className={classes.button}
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
}

export default MyAccountPage;
