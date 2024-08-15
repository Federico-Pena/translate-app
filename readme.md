# Template for Api with TypeScript

Basic TypeScript express api template, with ts-node and ts-standard for linting and type checking and prettier config for formatting. You must install eslint and prettier extension.

## Table of contents

- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Project structure](#project-structure)

## Scripts

To run tests, run the following command

```bash
  npm run test
```

To run development server, run the following command

```bash
  npm run dev
```

To build project, run the following command

```bash
  npm run build
```

## Dependencies

#### Dependencies

- cors
- express

#### Develop Dependencies

- @types/cors
- @types/express
- @types/supertest
- supertest
- ts-node
- ts-standard
- typescript
- vitest

## Project structure

```
├── .vscode
│ ├── extensions.json
│ └── settings.json
│ ├── public
│ │ ├── 404.html
│ │ ├── index.css
│ │ ├── index.html
│ │ |── index.js
│ │ └── node-icon.ico
├── src
│ ├── app
│ │ └── app.ts
│ ├── config
│ │ └── apiConfig.ts
│ ├── controllers
│ │ └── someController.ts
│ ├── middlewares
│ │ └── logger.ts
│ ├── routes
│ │ └── someRouter.routes.ts
│ ├── index.ts
├── tests
│ ├── controllers
│ │ └── someController.test.ts
│ ├── middlewares
│ │ └── logger.test.ts
├── dist
│ └── (Compiled TypeScript)
├── .env
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
├── readme.md
├── vitest.config
└── tsconfig.json
```
