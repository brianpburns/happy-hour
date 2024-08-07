# Happy Hour App

[Expo Dashboard](https://expo.dev/accounts/burnspbrian/projects/happy-hour)

### WIP Notes

- Maps [docs](https://docs.expo.dev/versions/latest/sdk/map-view/)
- See todos in Notes app

## Installation

If you're using NVM to manage your node version, you can sync your node version with that of the project by running:

```sh
nvm use
```

Now you can install the dependencies for all packages:

```
npm install
```

## Development

Expo is used to run locally. It will present options of which environment to use.

```
npm start
```

## Production Build and Deploy

```
npm run build:android
npm run build:ios
npm run build:all
```

## Secrets

Follow the info in this [post](https://dev.to/alexcoding42/how-to-set-environment-variables-with-easexpo-and-react-native-3b2n).

### Android

This can likely be optimized. It has only be done for internal testing releases so far. Run the Android build command.

Once the build completes, follow the link and download it. Then open [internal testing releases](https://play.google.com/console/u/0/developers/5251866793913232474/app/4972697416915556688/tracks/internal-testing?tab=releases) and upload it there. It should then be available on the Google Play store within an hour.

## Testing

```
npm test
```

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
