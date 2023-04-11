import {
  ActionIcon,
  Box,
  Button,
  Code,
  createStyles,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";
import React from "react";
import FormFields from "../utils/formFields";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

function UpdateRecordType() {
  const [opened, setOpened] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { recordTypeData } = state;

  const form = useForm({
    initialValues: {
      id: recordTypeData?.id,
      name: recordTypeData?.name,
      // department: recordTypeData?.department,
      fields: recordTypeData?.fields,
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

  const updateRecordType = async (values) => {
    let data = { ...values };
    data.fields = JSON.stringify(data.fields);

    try {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_ROOT_URL}/api/recordtype/`,
        headers: { Authorization: localStorage.getItem("SavedToken") },
        data: data,
      });
      setTitle("Success");
      setMessage("Record Type created");
      setOpened(true);
      // navigate("/");
    } catch (error) {
      setTitle("Error");
      setMessage(error.response.data.error);
      setOpened(true);
    }
  };

  const field = form.values.fields.map((item, index) => {
    if (index == 0) {
      return;
    }
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
        <Flex gap="sm" direction="row" align={"center"}>
          <Flex gap="md" direction="row" wrap="wrap" align={"center"}>
            <TextInput
              placeholder="Field Name"
              label="Field Name"
              withAsterisk
              sx={{ width: 500 }}
              {...form.getInputProps(`fields.${index}.name`)}
            />
            <Switch
              label="Required *"
              defaultChecked
              labelPosition="left"
              {...form.getInputProps(`fields.${index}.required`, {
                type: "checkbox",
              })}
            />
            <Select
              data={FormFields}
              withAsterisk
              label="Type of Question"
              sx={{ width: 200 }}
              {...form.getInputProps(`fields.${index}.type`)}
            />
            {form.getInputProps(`fields.${index}.type`).value === "CHOICES" ? (
              <TextInput
                placeholder="Put options in comma separated values"
                label="Options"
                withAsterisk
                sx={{ width: 500 }}
                value={form
                  .getInputProps(`fields.${index}.options`)
                  .value.join()}
                onChange={(e) =>
                  form.setFieldValue(
                    `fields.${index}.options`,
                    e.currentTarget.value.split(",").map((item) => item.trim())
                  )
                }
              />
            ) : null}

            {form.getInputProps(`fields.${index}.type`).value === "INT" ? (
              <>
                <NumberInput
                  defaultValue={0}
                  label="Minimum Value"
                  withAsterisk
                  {...form.getInputProps(`fields.${index}.min`)}
                />
                <NumberInput
                  defaultValue={0}
                  label="Maximum Value"
                  withAsterisk
                  {...form.getInputProps(`fields.${index}.max`)}
                />
              </>
            ) : null}

            <TextInput
              placeholder="Write something..."
              label="Help Text"
              sx={{ width: 500 }}
              {...form.getInputProps(`fields.${index}.helptext`)}
            />
          </Flex>
          <Divider orientation="vertical" />
          <ActionIcon
            color="red"
            onClick={() => form.removeListItem("fields", index)}
          >
            <IconTrash size="1.3rem" />
          </ActionIcon>
        </Flex>
        {/* <Divider /> */}
      </Group>
    );
  });

  const subfield = form.values.fields[0].subfields.map((item, index) => {
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
        <Flex gap="sm" direction="row" align={"center"}>
          <Flex gap="md" direction="row" wrap="wrap" align={"center"}>
            <TextInput
              placeholder="Field Name"
              label="Field Name"
              withAsterisk
              sx={{ width: 500 }}
              {...form.getInputProps(`fields.0.subfields.${index}.name`)}
            />
            <Switch
              label="Required *"
              defaultChecked
              labelPosition="left"
              {...form.getInputProps(`fields.0.subfields.${index}.required`, {
                type: "checkbox",
              })}
            />
            <Select
              data={FormFields}
              withAsterisk
              label="Type of Question"
              sx={{ width: 200 }}
              {...form.getInputProps(`fields.0.subfields.${index}.type`)}
            />
            {form.getInputProps(`fields.${index}.type`).value === "CHOICES" ? (
              <TextInput
                placeholder="Put options in comma separated values"
                label="Options"
                withAsterisk
                sx={{ width: 500 }}
                onChange={(e) =>
                  form.setFieldValue(
                    `fields.0.subfields.${index}.options`,
                    e.currentTarget.value.split(",").map((item) => item.trim())
                  )
                }
              />
            ) : null}

            {form.getInputProps(`fields.0.subfields.${index}.type`).value ===
            "INT" ? (
              <>
                <NumberInput
                  defaultValue={0}
                  label="Minimum Value"
                  withAsterisk
                  {...form.getInputProps(`fields.0.subfields.${index}.min`)}
                />
                <NumberInput
                  defaultValue={0}
                  label="Maximum Value"
                  withAsterisk
                  {...form.getInputProps(`fields.0.subfields.${index}.max`)}
                />
              </>
            ) : null}

            <TextInput
              placeholder="Write something..."
              label="Help Text"
              sx={{ width: 500 }}
              {...form.getInputProps(`fields.0.subfields.${index}.helptext`)}
            />
          </Flex>
          <Divider orientation="vertical" />
          <ActionIcon
            color="red"
            onClick={() => {
              form.setFieldValue("fields.0.max", subfield.length - 1);
              form.removeListItem("fields.0.subfields", index);
            }}
          >
            <IconTrash size="1.3rem" />
          </ActionIcon>
        </Flex>
        {/* <Divider /> */}
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
      <form onSubmit={form.onSubmit(updateRecordType)}>
        <Flex direction="row" justify={"space-between"}>
          <Title order={3} mb={10}>
            Update Record Type
          </Title>
          <Button type="submit" color="green">
            Update
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
            label="Record Type Name"
            placeholder="Name"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Department"
            withAsterisk
            mt="md"
            disabled
            value={recordTypeData?.department}
          />
        </Box>
        <Divider />
        <Title order={5} mb={10} mt={10}>
          Schema of Record Type
        </Title>
        <Box component="form" maw={1200}>
          {field.length > 0 ? null : (
            <Text color="dimmed" align="center">
              Insert atleast one column to make the record type
            </Text>
          )}

          {field}

          <Group position="center" mt="md" mb={"lg"}>
            <Button
              onClick={() =>
                form.insertListItem("fields", {
                  key: randomId(),
                  name: "",
                  helptext: "",
                  type: "",
                  subtype: "",
                  options: [],
                  required: true,
                  min: 0,
                  max: 0,
                })
              }
            >
              Add field
            </Button>
          </Group>

          <Divider />

          <Title order={5} mb={10} mt={10}>
            All Fields for Record
          </Title>
          {subfield.length > 0 ? null : (
            <Text color="dimmed" align="center">
              Insert atleast one column to make the record type
            </Text>
          )}
          {subfield}

          <Group position="center" mt="md" mb={"lg"}>
            <Button
              onClick={() => {
                form.setFieldValue("fields.0.max", subfield.length + 1);
                form.insertListItem("fields.0.subfields", {
                  key: randomId(),
                  name: "",
                  helptext: "",
                  type: "",
                  subtype: "",
                  options: [],
                  required: true,
                  min: 0,
                  max: 0,
                });
              }}
            >
              Add Table field
            </Button>
          </Group>

          <Text size="sm" weight={500} mt="md">
            Form values:
          </Text>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>

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

export default UpdateRecordType;
