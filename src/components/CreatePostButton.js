import { Affix, Button, createStyles } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  Button: {
    height: 75,
    width: 75,
    borderRadius: 999,
    background: "linear-gradient(#FD008C, #7901FF, #0097FF)",
    transitionDuration: "0.2s",

    "&:hover": {
      transform: "scale(1.2)",
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 75 * 0.85,
      width: 75 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 75 * 0.7,
      width: 75 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 40,
      width: 40,
    },
  },
}));

function CreatePostButton() {
  let navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Affix
      style={{ display: localStorage.getItem("SavedToken") ? "block" : "none" }}
      position={{ bottom: 20, right: 20 }}
      onClick={() => navigate("/create-post")}
    >
      <Button className={classes.Button}>
        <IconPlus />
      </Button>
    </Affix>
  );
}

export default CreatePostButton;
