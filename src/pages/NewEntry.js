import {
  Box,
  Button,
  createStyles,
  Flex,
  NumberInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.colors.customDark[2],
    padding: 10,
  },
  select: {
    width: "40%",
  },
}));

function NewEntry() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
      job: "",
      email: "",
      favoriteColor: "",
      age: 18,
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }, "Name must be 2-10 characters long"),
      job: isNotEmpty("Enter your current job"),
      email: isEmail("Invalid email"),
      favoriteColor: matches(
        /^#([0-9a-f]{3}){1,2}$/,
        "Enter a valid hex color"
      ),
      age: isInRange(
        { min: 18, max: 99 },
        "You must be 18-99 years old to register"
      ),
    },
  });
  return (
    <>
      <div className={classes.wrapper}>
        <Title order={3} mb={10}>
          New Entry
        </Title>
        <Flex direction={"row"} justify="space-between">
          <Select
            className={classes.select}
            placeholder="Select Report"
            data={[
              { value: "Lorem", label: "Lorem" },
              { value: "Ipsum", label: "Ipsum" },
              { value: "Dolor", label: "Dolor" },
              { value: "Sit", label: "Sit" },
              { value: "Amet", label: "Amet" },
              { value: "Sec", label: "Sec" },
              { value: "Mundus", label: "Mundus" },
              { value: "Cretus", label: "Cretus" },
              { value: "Est", label: "Est" },
            ]}
          />
          <Flex gap={16}>
            <Button bg={"green"}>Submit</Button>
            <Button variant="outline" c={"red"}>
              Reject
            </Button>
          </Flex>
        </Flex>
      </div>
      <Box
        component="form"
        maw={400}
        mx="auto"
        onSubmit={form.onSubmit(() => {})}
      >
        <TextInput
          label="Name"
          placeholder="Name"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Your job"
          placeholder="Your job"
          withAsterisk
          mt="md"
          {...form.getInputProps("job")}
        />
        <TextInput
          label="Your email"
          placeholder="Your email"
          withAsterisk
          mt="md"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Your favorite color"
          placeholder="Your favorite color"
          withAsterisk
          mt="md"
          {...form.getInputProps("favoriteColor")}
        />
        <NumberInput
          label="Your age"
          placeholder="Your age"
          withAsterisk
          mt="md"
          {...form.getInputProps("age")}
        />
      </Box>
    </>
  );
}

export default NewEntry;
