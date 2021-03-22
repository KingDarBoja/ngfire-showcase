# NgfireShowcase

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@ngfire-showcase/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

## Libraries Decision Process

For any new feature that belongs to a section (domain), create a grouping folder to contains those feature libraries.

```yml
apps
  - client-app
    - (...)
    - user-section
      - // The user feature-shell goes here.
  - server-app // NestJS example
    - user
      - user.controller.ts // imported `user.model` to share interfaces between server and client.
      - user.module.ts
libs
  - root
    - feature-shell
  - user
    - data-access
      - src/lib/user-http.service.ts
    - domain
      - src/lib/user-specific.model.ts
    - feature-page
    - feature-billing
    - feature-profile
    - ui-profile
    - util-profile
  - company
    - feature-page
    - feature-list
    - feature-search
  - country
    - (...)
  - shared
    - ui
    - domain-user
      - user.model.ts
```

- In this example, `root`, `user`, `company` and `country` are grouping folders containing *`feature`* libraries related to that domain. these feature libraries implement smart UI (with access to data sources) for specific business use cases or pages in an application.

In the specific case of `root` directory, it should be imported by the app root module `app.module.ts` which declares the root component and imports the `feature-shell` module which sets up routing, initializers, configuration, and other orchestration.

- These grouping directories can contain domain-specific *`data-access`* libraries, which provides code for interacting with a back-end system, including state management.

- Also can contain `ui` libraries, which are a collection of related presentational components. There are generally no services injected into these components (all of the data they need should come from Inputs). These are meant to be used by feature libraries.

- The *`domain`* / *`types`* specific libraries should contain code that should only be imported in other libraries under the grouping folder (i.e `user-specific.model.ts`) like as `util-profile`, `feature-profile`, and `ui-profile`. To enforce this, use the `scope:domain` tag along with ESLint `@nrwl/nx/enforce-module-boundaries` rule setting.

A good example would be a `ProfileContainerComponent` in `feature-profile` using ProfileComponent (presentational component) from `ui-profile`. Both might depend on `user-specific.model.ts`, so both allowed to access.

- Anything **shared** between multiple domains, not only libs but apps, should belong to `shared` grouping folder. Note that even an entire domain can be shared, for example between client-side apps. 

If a file needs to be used in other domains or apps (i.e `user.model.ts`) to allow interfacing between `data-access` and `feature` / `ui` libraries, it should be in a shared library as `domain-user` under the `shared` grouping folder.
