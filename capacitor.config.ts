import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.wisesa.comuline",
  appName: "Comuline X",
  webDir: "dist",
  android: {
    buildOptions: {
      keystorePath: "/Users/wisesa/work/key0",
      keystoreAlias: "key0",
    },
  },
};

export default config;
