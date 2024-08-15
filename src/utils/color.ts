import { useTheme } from "@mui/material/styles";
import Color from "color";

function shuffle(array: string[]) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

export function generateColorArray(length: number) {
  const theme = useTheme();
  const primaryColor = Color(theme.palette.primary.main);
  const baseHue = primaryColor.hue();
  const baseSaturation = primaryColor.saturationv();
  const baseValue = Math.max(primaryColor.value(), 0.8);

  const colors = [];
  const hueStep = 9;
  let currentHue = (baseHue + 30) % 360;

  for (let i = 0; i < length; i++) {
    while (
      currentHue >= 345 ||
      currentHue < 40 ||
      (currentHue >= 300 && currentHue < 345)
    ) {
      currentHue = (currentHue + hueStep) % 360;
    }
    let newColor = Color.hsv(currentHue, baseSaturation, baseValue);

    while (newColor.contrast(Color("white")) < 3.5) {
      newColor = newColor.darken(0.1);
    }

    colors.push(newColor.hex());
    currentHue = (currentHue + hueStep) % 360;
  }

  return colors;
}

const generatedColors = [
  "#615DD4",
  "#735DD4",
  "#855DD4",
  "#975DD4",
  "#A95DD4",
  "#BB5DD4",
  "#C545CE",
  "#9E802A",
  "#8E8326",
  "#7D8022",
  "#7B8E26",
  "#6B8E26",
  "#5B8E26",
  "#4C8E26",
  "#3C8E26",
  "#2C8E26",
  "#268E2F",
  "#268E3F",
  "#268E4E",
  "#268E5E",
  "#268E6E",
  "#268E7D",
  "#268E8D",
  "#2A8E9E",
  "#2F8BB0",
  "#3484C3",
  "#457DCE",
  "#5D7CD4",
  "#5D6AD4",
  "#615DD4",
  "#735DD4",
  "#855DD4",
  "#975DD4",
  "#A95DD4",
  "#BB5DD4",
  "#C545CE",
  "#9E802A",
  "#8E8326",
  "#7D8022",
  "#7B8E26",
];

export const usableColors = shuffle(generatedColors);
