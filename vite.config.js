import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change "manpower-landing" to your GitHub repo name
// e.g. if your repo URL is https://github.com/yourname/my-agency,
// set base to "/my-agency/"
export default defineConfig({
  plugins: [react()],
  base: "//marketing-site//",
});
