import { useTheme } from "@mui/material";

const generatedColors = [
  "#d22da6",
  "#737d03",
  "#bd42bb",
  "#bf00ff",
  "#c42dd2",
  "#c738b4",
  "#d32ca4",
  "#cd32ae",
  "#c738b4",
  "#c42ed1",
  "#056ffa",
  "#c518e7",
  "#bb44bb",
  "#c33cb8",
  "#c332cd",
  "#d12ea6",
  "#0970f6",
  "#737d02",
  "#c936b3",
  "#c332cd",
  "#cc33ae",
  "#ce31ac",
  "#c53ab7",
  "#c936b3",
  "#c936b3",
  "#767c03",
  "#bb44bb",
  "#c20af5",
  "#c33cb8",
  "#767c04",
  "#be41ba",
  "#c33cb8",
  "#bf00ff",
  "#d32ca3",
  "#c20af5",
  "#c20af5",
  "#c03fba",
  "#c332cd",
  "#c53ab7",
  "#bf00ff",
  "#c53ab7",
  "#d22da6",
  "#cd32ae",
  "#be41ba",
  "#6f7e02",
  "#be41ba",
  "#767c03",
  "#767c03",
  "#c639b6",
  "#ca35b1",
  "#d22da6",
  "#c518e7",
  "#d22da6",
  "#6f7e02",
  "#d52a9f",
  "#bf40bb",
  "#c738b4",
  "#ce31ac",
  "#c639b5",
  "#c528d7",
  "#d22da6",
  "#c42dd2",
  "#d02fa8",
  "#d52a9f",
  "#d22da6",
  "#d12ea6",
  "#c639b5",
  "#c13eba",
  "#cc33ae",
  "#ca35b1",
  "#c517e8",
  "#767c03",
  "#c20af5",
  "#c53ab7",
  "#056ffa",
  "#737d03",
  "#c20af5",
  "#c837b4",
  "#c42ed1",
  "#bb44bb",
  "#c43bb7",
  "#cf30aa",
  "#056ffa",
  "#d52a9f",
  "#c30ef1",
  "#bf40bb",
  "#c33cb8",
  "#c639b6",
  "#c332cd",
  "#c529d6",
  "#d02fa8",
  "#c332cd",
  "#767c04",
  "#c639b6",
  "#c20af5",
  "#c20af5",
  "#c209f6",
  "#767c03",
  "#cd32ae",
  "#c20af5",
  "#bf00ff",
  "#c03ac5",
  "#c518e7",
  "#0970f6",
  "#bf40bb",
  "#ce31ac",
  "#c738b4",
  "#d22da6",
  "#c23db9",
  "#c23db9",
  "#d02fa8",
  "#c517e8",
  "#767c04",
  "#056ffa",
  "#c738b4",
  "#cf30aa",
  "#bb44bb",
  "#be41ba",
  "#737d03",
  "#c43bb7",
];

const filteredGenerated = [
  "#d22da6",
  "#737d03",
  "#bd42bb",
  "#c42dd2",
  "#c738b4",
  "#cd32ae",
  "#056ffa",
  "#c518e7",
  "#c33cb8",
  "#c332cd",
  "#0970f6",
  "#c20af5",
  "#ca35b1",
  "#d52a9f",
  "#c528d7",
  "#c30ef1",
  "#c03ac5",
];

export function generateColorArray(numColors: number) {
  const colors: string[] = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}

export function generateRandomColor() {
  const theme = useTheme();
  const targetLuminance = calculateLuminance(theme.palette.primary.main);

  while (true) {
    let hue = Math.floor(Math.random() * 360);

    while (hue <= 40 || hue >= 320) {
      hue = Math.floor(Math.random() * 360);
    }

    const saturation = Math.random() * 0.6 + 0.4;
    let lightness = 0.5;

    let min = 0;
    let max = 1;
    for (let i = 0; i < 10; i++) {
      const color = hslToHex(hue, saturation, lightness);
      const luminance = calculateLuminance(color);

      if (Math.abs(luminance - targetLuminance) < 0.1) {
        if (hasGoodContrastWithWhite(color) && color.length === 7) {
          return color;
        }
        break;
      }

      if (luminance > targetLuminance) {
        max = lightness;
      } else {
        min = lightness;
      }
      lightness = (min + max) / 2;
    }
  }
}

function calculateLuminance(hex: string) {
  const rgb = hexToRgb(hex);
  const [r = 0, g = 0, b = 0] = rgb.map((val) => {
    if (val === undefined) return 0;
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hasGoodContrastWithWhite(hex: string): boolean {
  const L1 = calculateLuminance(hex);
  const L2 = 1;
  const contrast = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  return contrast >= 4.5;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result && result[1] ? result[1] : "0", 16),
    parseInt(result && result[2] ? result[2] : "0", 16),
    parseInt(result && result[3] ? result[3] : "0", 16),
  ];
}

function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function colorDistance(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  if (r1 && r2 && g1 && g2 && b1 && b2) {
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  }
  return 0;
}

function removeSimilarColors(colors: string[], threshold: number) {
  const uniqueColors: string[] = [];
  for (let i = 0; i < colors.length; i++) {
    let isSimilar = false;
    for (let j = 0; j < uniqueColors.length; j++) {
      if (colors[i] && colorDistance(colors[i], uniqueColors[j]) < threshold) {
        isSimilar = true;
        break;
      }
    }
    if (!isSimilar) {
      uniqueColors.push(colors[i]);
    }
  }
  return uniqueColors;
}

export const filtered = removeSimilarColors(generatedColors, 10);
