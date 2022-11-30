import React from "react";
import { Link } from "react-router-dom";
import { Center, Text, Title } from "@mantine/core";
import { ReactComponent as Heart } from "../assets/undraw_heart.svg";

function Footer() {
  return (
    <div
      style={{
        // marginTop: 50,
        height: 300,
        width: "100%",
        backgroundColor: "black",
        color: "white",
        position: "relative",
      }}
    >
      <Title
        order={3}
        style={{
          position: "relative",
          top: "20%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontWeight: 300,
          cursor: "default",
        }}
      >
        T R A V E L @ B P H C
      </Title>

      <Text
        style={{
          color: "white",
          textTransform: "capitalize",
          position: "relative",
          top: "30%",
          textAlign: "center",
          cursor: "default",
        }}
      >
        Made with <Heart height={20} /> by AARUSH & SHIVANSH
      </Text>

      <Center
        sx={{
          position: "relative",
          top: "40%",
          justifyContent: "center",
          gap: 10,
          fontSize: 12,
        }}
      >
        <Link to="/" exact>
          <Text>Dashboard</Text>
        </Link>
        <Link to="/posts" exact>
          <Text>All Posts</Text>
        </Link>
        <Link to="/upcoming-trips">
          <Text>Upcoming</Text>
        </Link>
        <Link to="/past-trips" exact>
          <Text>Past</Text>
        </Link>
        <Link to="/pending-approval" exact>
          <Text>Approval</Text>
        </Link>
      </Center>
      <Text
        style={{
          color: "white",
          textTransform: "capitalize",

          position: "relative",
          top: "55%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          cursor: "default",
        }}
      >
        © TravelBPHC 2022
      </Text>
    </div>
  );
}

export default Footer;
