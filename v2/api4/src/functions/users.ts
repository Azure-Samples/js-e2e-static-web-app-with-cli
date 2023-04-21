import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import mongoose from 'mongoose';
let dbInstance;

export const getDB = async () =>{
    if (!dbInstance) {
        dbInstance = await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING as string);
    }
    return dbInstance;
};
import { IUser, User, isUser } from "../models/user"; 
// app.post('create-user', {
//   route: "users",
//   authLevel: 'anonymous',
//   handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

//     console.log("create user")

//     // const user = await request.json();

//     // if (isUser(user)) {
//     //   console.log(`user ${JSON.stringify(user)}`)
//     await getDb();
//     //   const newUser = new User(user);
//     //   await newUser.save();

//     //   return {
//     //     jsonBody: await User.find(),
//     //   }
//     // }

//     return { status: 400, jsonBody: { message: "Invalid user" } };
//   }
// })
app.get('get-all-users', {
  route: "users",
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

    console.log("get all users")
    await getDB();
    return { jsonBody: await User.find() };
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


/*
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
*/
// app.deleteRequest('users/{id}', {
//   authLevel: 'anonymous',
//   handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {

//     // const id = request.query.get("id")

//     // if (id) {
//     //   await User.findByIdAndDelete(id);
//     //   return {
//     //     jsonBody: await User.find(),
//     //   }
//     // }
//     console.log("delete user")
//     return { status: 400, jsonBody: { message: "Invalid user" } };
//   }
// })
