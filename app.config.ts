import 'dotenv/config';

export default {
  expo: {
    name: 'Happy Hour',
    slug: 'happy-hour',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: 'Your location is used to find nearby happy hours.',
      },
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_GOOGLE_CLOUD_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['android.permission.ACCESS_FINE_LOCATION'],
      package: 'com.burnspbrian.happyhour',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'b1636bc5-8dbd-40b7-87cc-8bc851e08fae',
      },
    },
  },
};
