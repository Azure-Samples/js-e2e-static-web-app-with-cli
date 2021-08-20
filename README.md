# Static web app using CLI

This [Static web app](https://docs.microsoft.com/azure/static-web-apps/) using the [SWA CLI](https://github.com/Azure/static-web-apps-cli) to run the app locally.

## Features

This project framework provides the following features:

* React app and Api are in TypeScript
* Parent package.json with scripts to control full-stack locally

## Prepare your development environment

Install the following:

* Node.js
* VSCode
* SWA CLI
* Azure Functions Core Tools


## Steps to recreate 

### Create parent package.json file

1. In order to control both app and api projects, create a `./package.json` file in the root of the project.

    ```bash
    npm init -y
    ```

1. Install concurrently to run `package.json` scripts:

    ```bash
    npm install concurrently azure-functions-core-tools@3 --save-dev 
    ```

1. Replace the current `package.json` file's `scripts` section with the following script entries:

    ```bash
    "start-api": "cd api & func host start",
    "start-app": "cd app & npm start",
    "start-dev": "concurrently \"npm:start-api\" \"npm:start-app\" ",
    "swa-up": "swa start http://localhost:3000 --api http://localhost:7071",
    "start": " npm run start-dev &  npm run swa-up "
    ```


### Create React app

1. In the root of the project, create create-react-app in `/app` directory:

    ```bash
    npx create-react-app app --template typescript
    ```

1. Install dependencies:

    ```bash
    cd app && npm install && cd ..
    ```

### Create Function api

1. In the root of the project, create create-react-app in `/api` directory:

    ```bash
    func init api --worker-runtime node --language typescript
    ```

1. Install dependencies:

    ```bash
    cd api && npm install && cd ..
    ```

## Verify installation

1. At the root, start the full stack, both api and app, with the following script command:

    ```bash
    npm start
    ```

1. Verify the React client is running at `http://localhost:3000/` and is open in a browser.
1. Verify the Function is running at `http://localhost:7071/` with the following command:

    ```bash
    curl http://localhost:7071/api/hello --verbose
    ```