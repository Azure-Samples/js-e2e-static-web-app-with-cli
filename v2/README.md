# JavaScript end-to-end Static web app using CLI

For a complete tutorial, please use the [Microsoft Documentation tutorial found here](https://docs.microsoft.com/azure/developer/javascript/how-to/with-web-app/static-web-app-with-swa-cli/introduction). 

## Features

This project framework provides the following features:

* React app and API are in TypeScript
* Parent package.json with scripts to control full-stack locally

## Branches

The sample is developed through the branches:

|Branch name|Purpose|
|--|--|
|[1-basic-app-with-api](https://github.com/azure-samples/js-e2e-static-web-app-with-cli/tree/1-basic-app-with-api)|Simple React app with simple `/api/hello` endpoint.|
|[2-basic-app-with-api-and-auth](https://github.com/Azure-Samples/js-e2e-static-web-app-with-cli/tree/2-basic-app-with-api-and-auth)|Added _easy_ authentication to React app. Authentication providers include Microsoft Active Directory, Twitter, and GitHub.|

## Run sample

This sample is meant to be run from either your host machine or a host machine running the dev container in Visual Studio Code.

1. Installs all dependencies.

  ```javascript
  npm install
  ```
  
2. Start the Api (Azure Functions) and App (React) projects. Wait until the entire app is running. You need to watch the terminal to verify that both port 3000 and port 7071 are up. 

  ```javascript
  npm run start-dev
  ```

3. Open a new terminal window and start the SWA proxy. 

  ```javascript
  npm run start-swa
  ```

4. Open a browser to view the proxied site.

  ```
  http://localhost:4280
  ```
# func init --model v4 --language typescript --worker-runtime node --source-control