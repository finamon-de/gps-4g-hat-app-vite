# GPS 4G HAT - Web App

This repo shall give you a quick start in setting up an environment for using the GPS 4G HAT.

> The web app currently does not implement a fully sofisticated application. It makes naive assumptions and uses fake data here and there.

## Vite-based Template

The app is based on template that combines **React, Typescript and Vite**. Please, check [Vite's documentation](https://vitejs.dev/guide/) if you want to dig a bit deeper into the framework.

## Getting started

### Dependencies

Although this repository should give you a quick startup possiblity, it is coupled to the corresponding API implementation in its current state.

### Package manager

This app uses `yarn`.

### Environment variables

Environment variables can be found in the `.env` file. They need to be prefixed with `VITE_` to be accessable when the app is running. Without the prefix the variables will be `undefined` if you want to use them.

Currently, there are 3 varaible s that should be set

1. `VITE_MAPBOX_TOKEN` - This app uses mapbox to show a map. To receive a token head over to the [Mapbox website](https://www.mapbox.com/) and create a free account. Once logged in you can choose wether you want to create a new token or use the pre-generated public token.
2. `VITE_API_URL` - This url should point to the server. Please have a look at the separate server service implementation.
3. `VITE_SOCKET_URL` - This url can be used if you intend to use websockets for data exchange. As this app contains a _live view_ for updated GPS positions the url might point to the server implementation.

### Setup

To get the app up and running a few pretty forward steps need to be done

1. clone this repository
2. `cd` into `gps-4g-hat-vite`
3. run `yarn install`
4. then you probably want to test it and run `yarn dev`

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Roadmap

-   Implement functional user management
-   Improve device management
    -   Add all CRUD methods for devices
    -   To be able to see a device, you currently have to add the appropriate relationship via API call directly
-   Merge app project with server project (API implementation) to simplify the setup
