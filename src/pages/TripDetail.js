import {
  Text,
  createStyles,
  Grid,
  Button,
  Card,
  CardSection,
  Title,
} from "@mantine/core";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomDiv from "../components/CustomDiv";

const useStyles = createStyles((theme) => ({
  pageTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      fontSize: 28 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      fontSize: 28 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 16,
    },
  },

  wrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    width: "50%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "60%",
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "70%",
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "85%",
    },
  },

  button: {
    width: "100%",
    height: 80,
    borderRadius: 20,
    marginTop: 20,
    backgroundImage: "linear-gradient(to right, #FD008C, #7901FF, #0097FF)",
    opacity: 0.8,
    transitionDuration: "0.3s",

    "&:hover": {
      opacity: 1,
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      height: 70,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      height: 60,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: 50,
    },
  },

  text: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },

  sidePanel: {
    position: "sticky",
    top: 64,
    display: "flex",
    flexDirection: "column",
    height: window.innerHeight * 0.8,

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      top: 64 * 0.85,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      top: 64 * 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
}));

function TripDetail() {
  const { classes } = useStyles();
  let navigate = useNavigate();
  const [post, setPost] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    const Post = async () => {
      const data = await axios.get(`http://localhost:8000/api/trip/${id}`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setPost(data.data);
    };
    Post();
  }, []);
  if (post) {
    navigate("/create-post", {
      state: {
        flag: true,
        data: post,
      },
    });
  }
  return;
}

export default TripDetail;
