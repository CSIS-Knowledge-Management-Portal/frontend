import {
  Text,
  createStyles,
  TextInput,
  Button,
  Avatar,
  Grid,
  Divider,
  Dialog,
  Loader,
  Center,
  Collapse,
  ScrollArea,
  NavLink,
  Select,
  Title,
  Flex,
  Input,
  Tooltip,
  Menu,
  Box,
  Modal,
  Chip,
  ActionIcon,
  Pagination,
  Group,
} from "@mantine/core";
import React from "react";
import { IconSearch, IconX } from "@tabler/icons";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { UserContext } from "../utils/Context";
import { motion } from "framer-motion";
import CustomMenu from "../components/CustomMenu";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";

const useStyles = createStyles((theme) => ({
  actionWrapper: {
    // backgroundColor: "#A4ABBD",
    position: "sticky",
    top: 60,
    // height: 500,
    padding: 10,
    margin: 10,
  },
}));

function ReportDetail() {
  const { userDetail, upcomingTrips } = React.useContext(UserContext);
  const { classes } = useStyles();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = React.useState(1);
  const { id } = useParams();

  const pageLoaded = React.useCallback(
    (response) => {
      setPageLoading(false);
    },
    [pageLoading, upcomingTrips, userDetail]
  );

  if (pageLoading && upcomingTrips && userDetail) {
    pageLoaded();
  }

  const navigate = useNavigate();

  const MotionBox = motion(Box);

  const largeScreen = useMediaQuery("(min-width: 800px)");

  return !pageLoading ? (
    <>
      <Flex
        gap="md"
        direction="column"
        wrap="wrap"
        sx={{ padding: 20, marginBottom: 30 }}
      >
        <Title order={3}>Lorem Ipsum Dolor</Title>
        <Divider />
        <Grid gutter={"xl"} columns={3}>
          <Grid.Col md={2}>
            <Text>
              <p>
                Lorem ipsum dolor sit amet. Aut expedita excepturi et enim nisi
                sit velit eveniet aut magnam atque non sapiente debitis ut
                veniam voluptas. Sit tenetur culpa et provident deleniti aut
                delectus optio quo rerum suscipit eos nulla velit ex aperiam
                deserunt et excepturi consequatur. Id rerum dignissimos est iure
                autem qui perspiciatis fugit et voluptatum soluta qui galisum
                doloremque a repellendus voluptatibus et sunt natus.{" "}
              </p>
              <p>
                Ut consequuntur perferendis ut cupiditate eligendi ut inventore
                praesentium et amet eaque! Ut modi dolor aut nisi quos id enim
                consequuntur sed excepturi saepe qui assumenda dolore. Eum
                tempore dignissimos in ullam possimus qui natus reiciendis eos
                debitis rerum aut quasi dicta ut nisi culpa. Qui voluptatem quia
                33 sint dicta aut quaerat asperiores rem eius rerum est internos
                accusamus aut provident minima hic corporis voluptas.{" "}
              </p>
              <p>
                Qui quibusdam maxime sed autem magni et quis autem qui
                asperiores illo ab dolor officiis in doloribus asperiores. Sed
                architecto placeat nam nihil quos est labore vero ut nesciunt
                ipsa et beatae autem et enim error. Non internos unde hic enim
                quia a animi veritatis nam officiis voluptates sit dignissimos
                internos.{" "}
              </p>
              <p>
                Lorem ipsum dolor sit amet. Aut expedita excepturi et enim nisi
                sit velit eveniet aut magnam atque non sapiente debitis ut
                veniam voluptas. Sit tenetur culpa et provident deleniti aut
                delectus optio quo rerum suscipit eos nulla velit ex aperiam
                deserunt et excepturi consequatur. Id rerum dignissimos est iure
                autem qui perspiciatis fugit et voluptatum soluta qui galisum
                doloremque a repellendus voluptatibus et sunt natus.{" "}
              </p>
              <p>
                Ut consequuntur perferendis ut cupiditate eligendi ut inventore
                praesentium et amet eaque! Ut modi dolor aut nisi quos id enim
                consequuntur sed excepturi saepe qui assumenda dolore. Eum
                tempore dignissimos in ullam possimus qui natus reiciendis eos
                debitis rerum aut quasi dicta ut nisi culpa. Qui voluptatem quia
                33 sint dicta aut quaerat asperiores rem eius rerum est internos
                accusamus aut provident minima hic corporis voluptas.{" "}
              </p>
              <p>
                Qui quibusdam maxime sed autem magni et quis autem qui
                asperiores illo ab dolor officiis in doloribus asperiores. Sed
                architecto placeat nam nihil quos est labore vero ut nesciunt
                ipsa et beatae autem et enim error. Non internos unde hic enim
                quia a animi veritatis nam officiis voluptates sit dignissimos
                internos.{" "}
              </p>
              <p>
                Ut consequuntur perferendis ut cupiditate eligendi ut inventore
                praesentium et amet eaque! Ut modi dolor aut nisi quos id enim
                consequuntur sed excepturi saepe qui assumenda dolore. Eum
                tempore dignissimos in ullam possimus qui natus reiciendis eos
                debitis rerum aut quasi dicta ut nisi culpa. Qui voluptatem quia
                33 sint dicta aut quaerat asperiores rem eius rerum est internos
                accusamus aut provident minima hic corporis voluptas.{" "}
              </p>
              <p>
                Qui quibusdam maxime sed autem magni et quis autem qui
                asperiores illo ab dolor officiis in doloribus asperiores. Sed
                architecto placeat nam nihil quos est labore vero ut nesciunt
                ipsa et beatae autem et enim error. Non internos unde hic enim
                quia a animi veritatis nam officiis voluptates sit dignissimos
                internos.{" "}
              </p>
            </Text>
          </Grid.Col>
          <Divider orientation="vertical" />
          <Grid.Col md={"auto"} sx={{ position: "relative" }}>
            <div className={classes.actionWrapper}>
              <Flex gap="md" direction="column">
                <Button>View Entries / Generate Report</Button>
                <Button onClick={() => navigate("/new-entry")}>
                  New Entry
                </Button>
                <Button bg={"red"} onClick={open}>
                  Delete Report
                </Button>
                <Modal
                  opened={opened}
                  onClose={close}
                  size="auto"
                  title="Confirm Action"
                >
                  <Text>
                    Are you sure you want to delete this report? This action
                    cannot be undone.
                  </Text>

                  <Group mt="xl" position="right" onClick={close}>
                    <Button variant="outline" onClick={close}>
                      No
                    </Button>
                    <Button>Yes</Button>
                  </Group>
                </Modal>
              </Flex>
            </div>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  ) : (
    <Center style={{ width: "100%", height: window.innerHeight - 68 }}>
      <Loader />
    </Center>
  );
}

export default ReportDetail;
