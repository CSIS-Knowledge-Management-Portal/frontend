import { Button, Card, CardSection, createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.customDark[7]
        : theme.colors.gray[1],
    minHeight: 100,
    minWidth: 200,
    // height: 250,
    padding: 20,
    borderRadius: 20,
    borderColor: theme.colors.customDark[2],
    borderWidth: 0.7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Textbox: {
    padding: 10,
    fontSize: 16,
  },
  text: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.customDark[6],
    borderColor: theme.colors.customDark[2],
    borderStyle: "none",
    borderTopStyle: "solid",
  },
  label: {
    fontWeight: 500,
    fontSize: 16,
  },
}));

export default function CustomDiv() {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      className={classes.wrapper}
      style={{ width: 715, margin: 20 }}
    >
      <CardSection className={classes.Textbox}>
        {[1, 1, 1, 1].map(() => (
          <div className={classes.text}>
            <Text c="dimmed">Hello: </Text>
            <Text>World</Text>
          </div>
        ))}
      </CardSection>
      <CardSection>
        <Button.Group buttonBorderWidth={0.7} className={classes.buttonGroup}>
          <Button classNames={{ root: classes.button, label: classes.label }}>
            Heel
          </Button>
          <Button
            classNames={{ root: classes.button, label: classes.label }}
            style={{ borderLeftStyle: "solid" }}
          >
            llo
          </Button>
        </Button.Group>
      </CardSection>
    </Card>
  );
}
