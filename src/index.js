import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { CustomFont } from "./utils/CustomFont";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        fontFamily: "ArialN, sans-serif",
        fontWeight: 400,
        loader: "bars",
        colors: {
          customDark: [
            "#FFFFFF",
            "#939393",
            "#D6D6D6",
            "#2AC9DE",
            "#1AC2D9",
            "#11B7CD",
            "#171B24",
            "#010815",
            "#128797",
            "#000000",
          ],
          customWhite: [
            "#ffffff",
            "#f6f6f6",
            "#ececec",
            "#e1e1e1",
            "#d0d0d0",
            "#F71FA7",
            "#FF00A1",
            "#E00890",
            "#C50E82",
            "#000000",
          ],
          customBlue: ["#03254c", "#1167b1", "#187bcd", "#2a9df4", "#d0efff"],
        },
        globalStyles: (theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.customDark[7]
                : theme.colors.customWhite[2],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.customDark[0]
                : theme.colors.customWhite[9],
          },
        }),
      }}
    >
      <CustomFont />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
