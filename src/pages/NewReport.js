import {
  Box,
  Button,
  CloseButton,
  createStyles,
  Divider,
  Flex,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.colors.customDark[2],
    padding: 10,
  },
  select: {
    width: "30%",
  },
}));

function NewReport() {
  const [count, setCount] = React.useState(1);
  console.log(count);
  const { classes } = useStyles();

  return (
    <Flex
      gap="md"
      direction="column"
      wrap="wrap"
      sx={{ padding: 20, marginBottom: 30 }}
    >
      <Title order={3} mb={10}>
        New Report
      </Title>
      <Divider />
      <Title order={5} mb={10}>
        General Details
      </Title>
      <Box
        component="form"
        maw={400}
        // mx="auto"
        // onSubmit={form.onSubmit(() => {})}
      >
        <TextInput
          label="Report Name"
          placeholder="Name"
          withAsterisk
          // {...form.getInputProps("name")}
        />
        <TextInput
          label="About the report"
          // placeholder="Your job"
          withAsterisk
          mt="md"
          // {...form.getInputProps("job")}
        />
        <TextInput
          label="Your email"
          placeholder="Your email"
          withAsterisk
          mt="md"
          // {...form.getInputProps("email")}
        />
        <TextInput
          label="Your favorite color"
          placeholder="Your favorite color"
          withAsterisk
          mt="md"
          // {...form.getInputProps("favoriteColor")}
        />
      </Box>
      <Divider />
      <Title order={5} mb={10}>
        Data Fields
      </Title>
      <Box
        component="form"
        maw={700}
        // mx="auto"
        // onSubmit={form.onSubmit(() => {})}
      >
        {[...Array(count).keys()].map(() => (
          <Flex gap={10} mb={10} align="center">
            <TextInput
              label="Field Name"
              placeholder="Name"
              withAsterisk
              // {...form.getInputProps("name")}
            />
            <Select
              className={classes.select}
              label="Datatype"
              withAsterisk
              placeholder="Please select one"
              data={[
                { value: "String", label: "String" },
                { value: "Int", label: "Int" },
                { value: "Boolean", label: "Boolean" },
              ]}
            />
            <TextInput
              label="Help Text"
              placeholder="Type something..."
              // {...form.getInputProps("name")}
            />
            <CloseButton onClick={() => setCount((count) => count - 1)} />
          </Flex>
        ))}
        <Button onClick={() => setCount((count) => count + 1)}>
          Add more fields
        </Button>
      </Box>
    </Flex>
  );
}

export default NewReport;
