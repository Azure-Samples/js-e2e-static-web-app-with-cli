import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age: number;
}

// Create the User schema
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export const isUser = (obj: any): obj is IUser => {
  return obj && typeof obj.name === "string" && typeof obj.age === "number";
};

export const User = mongoose.model<IUser>("User", userSchema);
