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
        colorScheme: "dark",
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
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#FF00A1",
            "#E00890",
            "#C50E82",
            "#AD1374",
          ],
        },
        globalStyles: (theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.customDark[7]
                : theme.white,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.customDark[0]
                : theme.black,
          },
        }),
      }}
    >
      <CustomFont />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
