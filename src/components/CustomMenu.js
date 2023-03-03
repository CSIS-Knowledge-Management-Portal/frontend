import { Avatar, createStyles, Flex, Menu } from "@mantine/core";
import { IconChevronDown, IconFilter, IconLogout } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  icon: {
    display: "block",
    cursor: "pointer",
    borderRadius: 999,
    padding: 2,
    "&:hover": {
      backgroundColor: theme.colors.customDark[2],
      transitionDuration: "0.5s",
    },
  },
}));

function CustomMenu() {
  const { classes } = useStyles();
  return (
    <Menu shadow="md" position="bottom-start" withArrow>
      <Menu.Target>
        <Flex justify="center" align="center" direction="row">
          <IconFilter size={"2rem"} className={classes.icon} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Sort By</Menu.Label>
        <Menu.Item>Date Created</Menu.Item>
        <Menu.Item>Alphabetically</Menu.Item>
        <Menu.Item>No. of records</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CustomMenu;
