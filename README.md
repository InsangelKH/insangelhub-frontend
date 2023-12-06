## Launch project

- `npm install` - Installation of dependencies
- `npm run start` - Launch in develepoment mode

----

## Scripts

- `npm run build:prod` - Building project in production mode
- `npm run build:dev` - Building project in developemnt mode (not minimized)
- `npm run lint:ts` - Checking .ts files for syntax error with EsLint
- `npm run lint:ts:fix` - Fixing .ts files with EsLint

----

## Architecture

The project is made according with Feature sliced design methodology.

Documentation's link - [feature sliced design](https://feature-sliced.design/docs)

----

## Backend

The project's backend is based on NestJS (Node.js)
Repository's link - [InsangelHub backend](https://github.com/InsangelKH/insangelhub-backend)

----

## Translations

i18next library is used in this project to work with translations. Translation files are stored in public/locales.

For convenient work i18next plugin for vscode/webstorm is recommended.

Documentation - [i18next](https://www.i18next.com)

----

## Linting

Eslint is used in this project for checking typescript code.

Also there is author's own eslint plugin named eslint-insangel-plugin for avoiding absolute imports in terms of one module.

#### Linters launch
- `npm run lint:ts` - Checking .ts files for syntax error with EsLint
- `npm run lint:ts:fix` - Fixing .ts files with EsLint

----

## Configuration

The project is configured with Webpack. All configuration is stored in /config

----

## Data interaction

Data interaction is carried out by redux toolkit.

Server requests are carried out by redux async thunks.

[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader.tsx) is used for connecting async reducers.

----


## Entities

- [Article](/src/entities/Article/)
- [Comment](/src/entities/Comments/)
- [Profile](/src/entities/Profile/)
- [User](/src/entities/User/)

## Features

- [createArticle](/src/features/createArticle/)
- [fetchArticlesList](/src/features/fetchArticlesList/)
- [ImageSlider](/src/features/ImageSlider/)
- [loginByUsername](/src/features/loginByUsername/)
- [registerUser](/src/features/registerUser/)
- [updateArticle](/src/features/updateArticle/)
- [updateProfile](/src/features/updateProfile/)