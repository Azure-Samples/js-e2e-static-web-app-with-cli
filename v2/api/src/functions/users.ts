// @ts-nocheck

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
// import { MongoClient } from 'mongodb';

const users = ["Jane Doe"];

app.get('get-all-users', {
  route: "users",
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    console.log("get all users")
    return { jsonBody: users }
  }
})

// curl --location 'http://localhost:7071/api/users?user=mike' \
// --header 'Content-Type: application/json' \
// --data '{
//     "name": "dina",
//     "age": "21"
// }'

app.post('add-user', {
  route: "users",
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    const user = request.query.get('user')

    if (user) {
      users.push(user)
      return {
        jsonBody: user
      }
    }
    return { status: 404, jsonBody: { error: "user is missing" } }
  }
})
