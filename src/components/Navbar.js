import { Avatar, createStyles, Grid, Menu, Text } from "@mantine/core";
import React from "react";
import { IconChevronDown, IconLogout } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: 0,
    backgroundColor: theme.colors.customDark[6],
    alignItems: "center",
    position: "fixed",
    height: 68,
    paddingLeft: 20,
    paddingRight: 20,
    width: window.innerWidth,
    zIndex: 100,
    top: 8,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: 16,
      paddingRight: 16,
      height: 68 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      paddingLeft: 14,
      paddingRight: 14,
      height: 68 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      paddingLeft: 10,
      paddingRight: 10,
      height: 44,
    },
  },
  logo: {
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    cursor: "pointer",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 999,
  },
}));

function Navbar() {
  const { classes } = useStyles();
  return (
    <Grid columns={3} className={classes.wrapper}>
      <Grid.Col span={1} />
      <Grid.Col span={1}>
        <Text className={classes.logo}>TRAVEL@BPHC</Text>
      </Grid.Col>
      <Menu shadow="md" width={200} position="top-end">
        <Menu.Target>
          <Grid.Col span={1} className={classes.avatarContainer}>
            <Avatar variant="filled" className={classes.avatar} />
            <IconChevronDown />
          </Grid.Col>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item>My Account</Menu.Item>
          <Menu.Item>Upcoming Trips</Menu.Item>
          <Menu.Item>Past Trips</Menu.Item>
          <Menu.Item>Pending Approvals</Menu.Item>

          <Menu.Divider />

          <Menu.Item icon={<IconLogout size={14} />}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Grid>
  );
}

export default Navbar;
