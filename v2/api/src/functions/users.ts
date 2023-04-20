import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import UserCRUD, { IUser, isUser } from "../models/user"; 

const userCRUD = new UserCRUD('mongodb+srv://<USERNAME>:<PASSWORD>@<MONGODB_URI>/test?retryWrites=true&w=majority');

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

    return { jsonBody: await userCRUD.getUsers() };
  }
})
app.post('users', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    const user = await request.json();
    if (isUser(user)) {
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