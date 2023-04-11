import {
  HoverCard,
  TextInput,
  Text,
  Checkbox,
  Group,
  ActionIcon,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock, IconQuestionMark } from "@tabler/icons";
import dayjs from "dayjs";
import React from "react";

function FormStructure({ item, form, index }) {
  // const clockRef = React.useRef<HTMLInputElement>();

  if (item.type === "SHORT_TEXT")
    return (
      <TextInput
        placeholder={"Write here..."}
        label={item.name}
        required={item.required}
        sx={{ width: 500 }}
        // {...form.getInputProps(`fields.${index}.value`)}
        onChange={(e) =>
          form.setFieldValue(`fields.${index}.value`, e.currentTarget.value)
        }
        rightSection={
          item.helptext.length > 0 ? (
            <HoverCard
              width={280}
              offset={200}
              shadow="md"
              position="top-start"
            >
              <HoverCard.Target>
                <IconQuestionMark size={"1rem"} />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{item.helptext}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ) : null
        }
      />
    );

  if (item.type === "CHOICES")
    return (
      <Checkbox.Group
        defaultValue={[]}
        label={item.name}
        description={item.helptext.length > 0 ? item.helptext : null}
        required={item.required}
        onChange={(value) => form.setFieldValue(`fields.${index}.value`, value)}
      >
        <Group mt="xs">
          {item.options.map((item, id) => (
            <Checkbox key={id} label={item} value={item} />
          ))}
        </Group>
      </Checkbox.Group>
    );

  if (item.type === "DATE")
    return (
      <DatePicker
        placeholder="Click to open Calendar"
        label={item.name}
        required={item.required}
        inputFormat="YYYY-MM-DD"
        onChange={(value) =>
          form.setFieldValue(
            `fields.${index}.value`,
            dayjs(value).format("YYYY-MM-DD")
          )
        }
        rightSection={
          item.helptext.length > 0 ? (
            <HoverCard
              width={280}
              offset={200}
              shadow="md"
              position="top-start"
            >
              <HoverCard.Target>
                <IconQuestionMark size={"1rem"} />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{item.helptext}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ) : null
        }
      />
    );

  if (item.type === "TIME")
    return (
      <TimeInput
        label={item.name}
        required={item.required}
        placeholder="Enter Time in 24 hour format"
        rightSection={
          item.helptext.length > 0 ? (
            <HoverCard
              width={280}
              offset={200}
              shadow="md"
              position="top-start"
            >
              <HoverCard.Target>
                <IconQuestionMark size={"1rem"} />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{item.helptext}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ) : null
        }
        onChange={(value) =>
          form.setFieldValue(
            `fields.${index}.value`,
            dayjs(value).format("HH:mm:ss")
          )
        }
        maw={400}
        mx="auto"
      />
    );

  if (item.type === "INT")
    return (
      <>
        <NumberInput
          // defaultValue={18}
          // placeholder="Your age"
          label={item.name}
          required={item.required}
          {...form.getInputProps(`fields.${index}.value`)}
        />
        {item.helptext.length > 0 ? (
          <HoverCard width={280} offset={200} shadow="md" position="top-start">
            <HoverCard.Target>
              <IconQuestionMark size={"1rem"} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">{item.helptext}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : null}
      </>
    );

  if (item.type === "LONG_TEXT")
    return (
      <Textarea
        placeholder="Write here..."
        label={item.name}
        required={item.required}
        sx={{ width: 500 }}
        {...form.getInputProps(`fields.${index}.value`)}
      />
    );

  if (item.type === "ARRAY")
    return (
      <Checkbox.Group
        defaultValue={[]}
        label={item.name}
        description={item.helptext.length > 0 ? item.helptext : null}
        required={item.required}
        onChange={(value) => form.setFieldValue(`fields.0.value`, value)}
      >
        <Group mt="xs">
          {item.subfields.map((item, id) => (
            <Checkbox key={id} label={item.name} value={JSON.stringify(item)} />
          ))}
        </Group>
      </Checkbox.Group>
    );
}

export default FormStructure;
