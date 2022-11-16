import { Global } from "@mantine/core";
import normal from "../assets/font/ArialNova.ttf";
import light from "../assets/font/ArialNova-Light.ttf";

export function CustomFont() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "ArialN",
            src: `url('${normal}') format("ttf")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "ArialN",
            src: `url('${light}') format("ttf")`,
            fontWeight: 300,
            fontStyle: "light",
          },
        },
      ]}
    />
  );
}
