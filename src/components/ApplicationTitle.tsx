import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function ApplicationTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const theme = useTheme();

  const desiredEdgeDistance = 20;
  const [scaleFactor, setScaleFactor] = useState(1);

  const titleStackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      const calculateScale = (windowWidth: number, elementWidth: number) => {
        const maxWidth = windowWidth - desiredEdgeDistance * 2;
        return maxWidth / elementWidth;
      };

      if (titleStackRef.current) {
        const elementWidth = titleStackRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const calculatedScale = calculateScale(windowWidth, elementWidth);

        setScaleFactor(calculatedScale);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, [theme.palette.mode]);

  return (
    <Stack
      ref={titleStackRef}
      direction="row"
      spacing={2}
      sx={{
        paddingRight: 2,
        transform: scaleFactor < 1 ? `scale(${scaleFactor})` : "scale(1)",
      }}
    >
      <Divider
        aria-hidden="true"
        orientation="vertical"
        flexItem
        sx={{
          borderRightWidth: 5,
          borderRadius: 5,
        }}
      />

      <Stack>
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 33,
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          <TypeAnimation
            key={theme.palette.mode}
            sequence={[subtitle]}
            speed={65}
            style={{
              color: theme.palette.secondary.contrastText,
              fontSize: 33,
              fontWeight: 500,
              paddingLeft: 7,
              alignContent: "left",
              alignItems: "left",
              whiteSpace: "nowrap",
            }}
          />
        </Typography>
      </Stack>
    </Stack>
  );
}
