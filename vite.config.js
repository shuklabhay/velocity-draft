import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],
    base: "/velocity-draft/",
    404: "./404.html",
  });
};
