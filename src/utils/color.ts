import { useTheme } from "@mui/material";

// Running color math is VERY computationally expensive

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

      if (Math.abs(luminance - targetLuminance) < 0.11) {
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
