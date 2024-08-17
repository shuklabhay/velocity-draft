import { useTheme } from "@mui/material/styles";
import Color from "color";

function shuffle(array: string[]) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

function colorDifference(color1: Color, color2: Color) {
  const hDiff = Math.abs(color1.hue() - color2.hue());
  const sDiff = Math.abs(color1.saturationl() - color2.saturationl());
  const lDiff = Math.abs(color1.lightness() - color2.lightness());
  return hDiff + sDiff + lDiff;
}

export function generateColorArray(count: number) {
  const theme = useTheme();
  const baseColor = Color(theme.palette.primary.main);
  const colors: string[] = [];
  const hueStep = 360 / count;

  const minDifference = 40;
  const contrastThreshold = 4;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      const hue = (i * hueStep + Math.random() * hueStep) % 360;
      const saturation = 50 + Math.random() * 50;
      const lightness = 25 + Math.random() * 50;

      const newColor = Color.hsl(hue, saturation, lightness);

      if (
        Math.abs(newColor.hue() - 0) > 15 &&
        Math.abs(newColor.hue() - 360) > 15
      ) {
        if (newColor.contrast(Color("white")) >= contrastThreshold) {
          if (
            colorDifference(newColor, baseColor) > minDifference &&
            colors.every(
              (c) => colorDifference(newColor, Color(c)) > minDifference
            )
          ) {
            colors.push(newColor.hex());
            break;
          }
        }
      }
      attempts++;
    }

    if (attempts === maxAttempts) {
      console.warn(`Could not find a suitable color for index ${i}`);
    }
  }

  return shuffle(colors);
}

export function ColorBoxes({ hexCodes }: { hexCodes: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {hexCodes.map((hexCode, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: hexCode,
            margin: "5px",
          }}
        />
      ))}
    </div>
  );
}

export const generatedColors = [
  "#3972F1",
  "#BD1DB0",
  "#AF642C",
  "#3A0EC2",
  "#8551DD",
  "#BC47CE",
  "#992956",
  "#A223FA",
  "#020A87",
  "#19718C",
  "#E7278C",
  "#438A2B",
  "#206D35",
  "#038132",
  "#6977D8",
  "#7A074D",
  "#807622",
  "#201E6D",
  "#547A18",
  "#A801AE",
  "#0181DA",
  "#5F2D90",
  "#6F5CFA",
  "#148611",
  "#398204",
  "#5A0F82",
  "#17905F",
  "#BB0232",
  "#1938A3",
  "#652258",
  "#B26D08",
  "#087D73",
  "#70760A",
  "#27756D",
  "#7B2C10",
];
