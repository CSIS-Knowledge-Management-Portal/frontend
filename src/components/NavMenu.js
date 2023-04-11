import { createStyles, NavLink, ScrollArea } from "@mantine/core";
import { IconHome2, IconTable } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../utils/Context";

const useStyles = createStyles((theme) => ({
  menu: {
    color: theme.colors.customDark[0],
  },

  menuItem: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: theme.colors.customDark[1],
    // transitionDuration: "0.2s",

    "&:hover": {
      color: theme.colors.customDark[9],
      transitionDuration: "0.5s",
    },
  },
}));

function NavMenu() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { recordTypes } = React.useContext(UserContext);

  const [active, setActive] = React.useState("home");
  return (
    <ScrollArea className={classes.menu} h={"90%"} w={"90%"}>
      <NavLink
        className={classes.menuItem}
        label="Home"
        icon={<IconHome2 size="1rem" stroke={1.5} />}
        active={active == "home" ? true : false}
        onClick={() => {
          setActive("home");
          navigate("/");
        }}
      />
      <NavLink
        // defaultOpened
        className={classes.menuItem}
        label="Recent..."
        childrenOffset={28}
      >
        <NavLink className={classes.menuItem} label="First child link" />
        <NavLink className={classes.menuItem} label="Second child link" />
        <NavLink className={classes.menuItem} label="Third child link" />
      </NavLink>
      <NavLink
        defaultOpened
        className={classes.menuItem}
        label="Record Types"
        childrenOffset={28}
      >
        {recordTypes?.map((item, id) => (
          <NavLink
            key={id}
            className={classes.menuItem}
            label={item.name}
            active={active == "all-record" ? true : false}
            onClick={() => {
              setActive("all-record");
              navigate(`all-record/${item.id}`);
            }}
          />
        ))}

        {/* <NavLink className={classes.menuItem} label="Hostels" />
        <NavLink className={classes.menuItem} label="Marklist" /> */}
      </NavLink>
      <NavLink
        className={classes.menuItem}
        label="Templates"
        icon={<IconTable size="1rem" stroke={1.5} />}
        active={active == "template" ? true : false}
        onClick={() => {
          setActive("template");
          navigate("/");
        }}
      />
    </ScrollArea>
  );
}

export default NavMenu;
