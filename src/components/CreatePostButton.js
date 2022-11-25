import { Affix, Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router";

function CreatePostButton() {
  let navigate = useNavigate();
  return (
    <Affix
      position={{ bottom: 20, right: 20 }}
      onClick={() => navigate("/create-post")}
    >
      <Button>+</Button>
    </Affix>
  );
}

export default CreatePostButton;
