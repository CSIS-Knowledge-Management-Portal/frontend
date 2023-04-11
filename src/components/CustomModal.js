import { Alert, Flex, Modal } from "@mantine/core";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons";
import React from "react";

function CustomModal({ opened, setOpened, title, message }) {
  return title === "Error" ? (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Flex gap={2} align={"center"}>
          <IconAlertCircle size={"1rem"} />
          {title}!
        </Flex>
      }
      centered
      styles={{
        header: {
          color: "red",
        },
      }}
    >
      {message}
    </Modal>
  ) : (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <Flex gap={2} align={"center"}>
          <IconCircleCheck size={"1rem"} />
          {title}!
        </Flex>
      }
      centered
      styles={{
        header: {
          color: "green",
        },
      }}
    >
      {message}
    </Modal>
  );
}

export default CustomModal;
