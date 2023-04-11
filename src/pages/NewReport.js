import {
  ActionIcon,
  Box,
  Button,
  Code,
  createStyles,
  Divider,
  Flex,
  Group,
  HoverCard,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconQuestionMark, IconTrash } from "@tabler/icons";
import React from "react";
import FormFields from "../utils/formFields";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import FormStructure from "../utils/FormStructure";

function selectProps(...props) {
  return function (obj) {
    const newObj = {};
    props.forEach((name) => {
      newObj[name] = obj[name];
    });

    return newObj;
  };
}

function NewRecordType() {
  const [opened, setOpened] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { recordTypeData } = state;

  const reducedRecordTypeData = recordTypeData.fields.map(
    selectProps("name", "key")
  );

  const form = useForm({
    initialValues: {
      name: "",
      department: "",
      recordtype: recordTypeData.id,
      fields: reducedRecordTypeData,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      fields: (value) => {
        if (value.length < 1) {
          setTitle("Error");
          setMessage("Insert atleast one column to make the record type");
          setOpened(true);
        }
      },
      department: (value) => {
        if (value.length < 1) {
          setTitle("Error");
          setMessage("Please enter department name");
          setOpened(true);
        }
        if (value.length > 100) {
          setTitle("Error");
          setMessage("Please keep shorter department");
          setOpened(true);
        }
      },
      name: (value) => {
        if (value.length < 1) {
          setTitle("Error");
          setMessage("Please enter Name");
          setOpened(true);
        }
        if (value.length > 255) {
          setTitle("Error");
          setMessage("Please keep shorter name");
          setOpened(true);
        }
      },
    },
  });

  const createRecordType = async (values) => {
    let data = { ...values };
    data.fields = JSON.stringify(data.fields);
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_ROOT_URL}/api/record/`,
        headers: { Authorization: localStorage.getItem("SavedToken") },
        data: data,
      });
      setTitle("Success");
      setMessage("Record created");
      setOpened(true);
      // navigate("/");
    } catch (error) {
      setTitle("Error");
      setMessage(error.response.data.error);
      setOpened(true);
    }
  };

  const field = recordTypeData.fields.map((item, index) => {
    if (index === 0) return;
    return (
      <Group
        key={item.key}
        my={"md"}
        sx={(theme) => ({
          padding: 10,
          borderRadius: 10,
          transitionDuration: "0.4s",
          "&:hover": {
            backgroundColor: theme.fn.darken("#f6f6f6", 0.1),
          },
        })}
      >
        <Flex gap="md" direction="row" wrap="wrap" align={"center"}>
          <FormStructure item={item} form={form} index={index} />
        </Flex>
      </Group>
    );
  });

  return (
    <Flex
      gap="md"
      direction="column"
      wrap="wrap"
      sx={{ padding: 20, marginBottom: 30 }}
    >
      <form onSubmit={form.onSubmit(createRecordType)}>
        <Flex direction="row" justify={"space-between"}>
          <Title order={3} mb={10}>
            New Record
          </Title>
          <Button type="submit" color="green">
            Submit
          </Button>
        </Flex>
        <Divider />
        <Title order={5} mb={10}>
          General Details
        </Title>
        <Box
          component="form"
          maw={400}
          // mx="auto"
          mb={20}
        >
          <TextInput
            label="Record Name"
            placeholder="Name"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Department"
            // placeholder="Your job"
            withAsterisk
            mt="md"
            {...form.getInputProps("department")}
          />
        </Box>
        <Divider />
        <Title order={5} mb={10} mt={10}>
          Enter meta data
        </Title>
        <Box component="form" maw={1200}>
          {field.length > 0 ? null : (
            <Text color="dimmed" align="center">
              Insert atleast one column to make the record type
            </Text>
          )}

          {field}

          <Group
            my={"md"}
            sx={(theme) => ({
              padding: 10,
              borderRadius: 10,
              transitionDuration: "0.4s",
              "&:hover": {
                backgroundColor: theme.fn.darken("#f6f6f6", 0.1),
              },
            })}
          >
            <Flex gap="md" direction="row" wrap="wrap" align={"center"}>
              <FormStructure
                item={recordTypeData.fields[0]}
                form={form}
                index={0}
              />
            </Flex>
          </Group>
          <Text size="sm" weight={500} mt="md">
            Form values:
          </Text>
          <Code block maw={900}>
            {JSON.stringify(form.values, null, 2)}
          </Code>

          <CustomModal
            opened={opened}
            setOpened={setOpened}
            title={title}
            message={message}
          />
        </Box>
      </form>
    </Flex>
  );
}

export default NewRecordType;
