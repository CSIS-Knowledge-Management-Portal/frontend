import {
  Avatar,
  Button,
  createStyles,
  Flex,
  Menu,
  Select,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { IconChevronDown, IconLogout } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { ReactComponent as Logo } from "../assets/travelbphc-logo-sm.svg";
import { UserContext } from "../utils/Context";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.customDark[6],
    color: theme.colors.customDark[0],
    alignItems: "center",
    position: "sticky",
    top: 0,
    height: 48,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    width: window.innerWidth,
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-end",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      paddingLeft: 14,
      paddingRight: 14,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },

  logo: {
    height: 64,
    width: "auto",
    position: "absolute",
    marginLeft: "50%",
    transform: "translateX(-60%)",

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 64 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 64 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 40,
    },
  },

  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: 20,
    gap: 20,
  },

  avatarWrapper: {
    cursor: "pointer",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 20,
    transitionDuration: "0.5s",
    "&:hover": {
      backgroundColor: theme.colors.customDark[1],
      transitionDuration: "0.5s",
    },
  },

  avatar: {
    // top: 12,
    cursor: "pointer",
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 999,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 50 * 0.85,
      width: 50 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 50 * 0.7,
      width: 50 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 30,
      width: 30,
      marginRight: 5,
    },
  },
}));

function Navbar({ loggedIn, setLoggedIn }) {
  const { classes } = useStyles();
  const { userDetail } = React.useContext(UserContext);

  const Logout = () => {
    navigate("/");
    localStorage.removeItem("SavedToken");
    setLoggedIn(false);
    googleLogout();
  };

  let navigate = useNavigate();

  React.useEffect(() => {}, [loggedIn]);

  return (
    <div
      className={classes.wrapper}
      style={{ display: loggedIn ? null : "none" }}
    >
      <Text fz="xl" fw={700}>
        Knowledge Management Portal
      </Text>
      <div className={classes.avatarContainer}>
        <Select
          // label="Dashboard View"
          placeholder="Select View"
          data={[
            { value: "Admin", label: "Admin" },
            { value: "Moderator", label: "Moderator" },
            { value: "User", label: "User" },
          ]}
        />
        <Text fz="md">Hi, Aarush!</Text>
        <Menu shadow="md" width={200} position="top-end">
          <Menu.Target>
            <Flex
              justify="center"
              align="center"
              className={classes.avatarWrapper}
              direction="row"
            >
              <Avatar
                variant="filled"
                className={classes.avatar}
                src={userDetail?.pfp}
              />
              <IconChevronDown size={14} />
            </Flex>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Link to="/">
              <Menu.Item>Dashboard</Menu.Item>
            </Link>
            <Link to="/posts">
              <Menu.Item>All Posts</Menu.Item>
            </Link>
            <Link to="/upcoming-trips">
              <Menu.Item>Upcoming Trips</Menu.Item>
            </Link>
            <Link to="/past-trips">
              <Menu.Item>Past Trips</Menu.Item>
            </Link>
            <Link to="/pending-approval">
              <Menu.Item>Pending Approvals</Menu.Item>
            </Link>

            <Menu.Divider />

            <Menu.Item icon={<IconLogout size={14} />} onClick={Logout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
{
  /*  */
}
