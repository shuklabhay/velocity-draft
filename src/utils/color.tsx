import { useTheme } from "@mui/material/styles";
import Color from "color";

function shuffle(array: string[]) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

function colorDifference(color1: Color, color2: Color): number {
  const hDiff = Math.abs(color1.hue() - color2.hue());
  const sDiff = Math.abs(color1.saturationl() - color2.saturationl());
  const lDiff = Math.abs(color1.lightness() - color2.lightness());
  return hDiff + sDiff + lDiff;
}

export function generateColorArray(count: number): string[] {
  const theme = useTheme();
  const baseColor = Color(theme.palette.primary.main);
  const colors: string[] = [];
  const hueStep = 360 / count;

  const minDifference = 40; // Reduced for more flexibility
  const contrastThreshold = 4; // Slightly reduced for more options

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      const hue = (i * hueStep + Math.random() * hueStep) % 360;
      const saturation = 50 + Math.random() * 50; // 50-100%
      const lightness = 25 + Math.random() * 50; // 25-75%

      const newColor = Color.hsl(hue, saturation, lightness);

      // Check if the color is not too close to red
      if (
        Math.abs(newColor.hue() - 0) > 15 &&
        Math.abs(newColor.hue() - 360) > 15
      ) {
        // Check contrast with white
        if (newColor.contrast(Color("white")) >= contrastThreshold) {
          // Check if it's not too similar to the base color and other generated colors
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

  return colors;
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
  "#3E11C9",
  "#7F1B71",
  "#9B6314",
  "#2E851C",
  "#BE3B79",
  "#066EA2",
  "#5959D3",
  "#B547D0",
  "#C80264",
  "#23825D",
  "#737927",
  "#8904AC",
  "#578C10",
  "#029B45",
  "#BE6937",
  "#268EE5",
  "#0E228E",
  "#18929B",
  "#6452FD",
  "#F50DDD",
  "#955BE9",
  "#F26019",
  "#13A02C",
  "#48287E",
  "#E35ED4",
  "#B333F0",
  "#D8436A",
  "#AE13A6",
  "#5976E5",
  "#286A7A",
  "#9B037B",
  "#9A4301",
  "#F35C8A",
  "#0A9806",
  "#C95BB1",
  "#10A073",
  "#4A7526",
  "#89124B",
  "#7E1AB6",
  "#993099",
];

export const usableColors = shuffle(generatedColors);
