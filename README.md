# JavaScript end-to-end Static web app using CLI

For a complete tutorial, please use the [Microsoft Documentation tutorial found here](https://docs.microsoft.com/azure/developer/javascript/how-to/with-web-app/static-web-app-with-swa-cli/introduction).

## Features

This project framework provides the following features:

* React app and API are in TypeScript
* Parent package.json with scripts to control full-stack locally

## Instructions

### Web

First go to the `app` folder and install node modules.

`cd app && npm i && cd ..`

### Azure Function

Next change to the `api` directory and install node modules.

`cd api && npm i && cd ..`

### Run the example

Finally you can start the example locally by running `npm run start-dev` which will concurrently run the react app and the azure function together.

Your browser should open to [http://localhost:3000/] where you can input your name and click Submit to invoke the Azure Function api locally.

## Branches

The sample is developed through the branches:

|Branch name|Purpose|
|--|--|
|[1-basic-app-with-api](https://github.com/azure-samples/js-e2e-static-web-app-with-cli/tree/1-basic-app-with-api)|Simple React app with simple `/api/hello` endpoint.|
|[2-basic-app-with-api-and-auth](https://github.com/Azure-Samples/js-e2e-static-web-app-with-cli/tree/2-basic-app-with-api-and-auth)|Added _easy_ authentication to React app. Authentication providers include Microsoft Active Directory, Twitter, and GitHub.|
