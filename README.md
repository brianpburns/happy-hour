# Masters Leaderboard

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

iOS

```
npm run ios
```

If there are errors, try running `pod install` in the ios directory.

Android:

- First start the emulator in Android Sudio -> Virtual Devices.

```
npm run android
```

## Production Build

```
npm run build:prod
```

## Testing

```
npm test
```

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
