import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import UserCRUD, { IUser, isUser } from "../models/user"; 

const connectionString = process.env.MONGODB_CONNECTIONSTRING;
const userCRUD = new UserCRUD(connectionString);

app.get('users/{id}', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    const id = request.query.get("id")

    if (id) {
      const user = await userCRUD.getUserById(id);
      return { jsonBody: user };
    }

    return { status: 400, jsonBody: { message: "Invalid id" } };
  }
})
app.get('users', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    console.log("get all users")
    return { jsonBody: await userCRUD.getUsers() };
  }
})
/*
curl --location 'http://localhost:7071/api/users' \
--header 'Content-Type: application/json' \
--data '{
    "name": "dina",
    "age": "21"
}'
*/
app.post('users', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    console.log("create user")
    const user = await request.json();

    if (isUser(user)) {
      console.log(`user ${JSON.stringify(user)}`)
      await userCRUD.createUser(user as IUser);
      return {
        jsonBody: await userCRUD.getUsers(),
      }
    }

    return { status: 400, jsonBody: { message: "Invalid user" } };
  }
})

app.put('users/{id}', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    const id = request.query.get("id")
    const user = await request.json();

    if (isUser(user)) {
      await userCRUD.updateUserById(id, user);
      return {
        jsonBody: await userCRUD.getUsers(),
      }
    }

    return { status: 400, jsonBody: { message: "Invalid user" } };
  }
})

app.deleteRequest('users/{id}', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    const id = request.query.get("id")

    if (id) {
      await userCRUD.deleteUserById(id);
      return {
        jsonBody: await userCRUD.getUsers(),
      }
    }

    return { status: 400, jsonBody: { message: "Invalid user" } };
  }
})

export default app