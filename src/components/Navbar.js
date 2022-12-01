import { Avatar, Button, createStyles, Menu, Text } from "@mantine/core";
import React from "react";
import { IconChevronDown, IconLogout } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { ReactComponent as Logo } from "../assets/travelbphc-logo-sm.svg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.customDark[6],
    alignItems: "center",
    position: "sticky",
    top: 0,
    height: 68,
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
      height: 48,
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
    cursor: "pointer",
    position: "absolute",
    right: 20,
  },

  avatar: {
    height: 45,
    width: 45,
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

function Navbar({ loggedIn, setLoggedIn, setUserDetail }) {
  const { classes } = useStyles();
  const [user, setUser] = React.useState();

  const Logout = () => {
    navigate("/");
    localStorage.removeItem("SavedToken");
    setLoggedIn(false);
    googleLogout();
  };

  let navigate = useNavigate();

  React.useEffect(() => {
    const User = async () => {
      const data = await axios.get(`${process.env.REACT_APP_ROOT_URL}/user/`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setUser(data.data);
      setUserDetail(data.data);
    };
    User();
  }, [loggedIn]);

  return (
    <div
      className={classes.wrapper}
      style={{ display: loggedIn ? null : "none" }}
    >
      <Logo
        className={classes.logo}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* <Link to="/">
          <Button variant="subtle">Dashboard</Button>
        </Link>
        <Link to="/create-post">
          <Button variant="subtle">Create Post</Button>
        </Link> */}
        <Menu shadow="md" width={200} position="top-end">
          <Menu.Target className={classes.avatarContainer}>
            <div>
              <Avatar
                variant="filled"
                className={classes.avatar}
                src={user?.pfp}
              />
              <IconChevronDown size={14} />
            </div>
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
