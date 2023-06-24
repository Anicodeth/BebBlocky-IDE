import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.beblocky.app',
  appName: 'Beblocky-Ide',
  webDir: 'dist/bebblocky-ide',
  server: {
    androidScheme: 'https'
  }
};

export default config;
