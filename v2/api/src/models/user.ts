import mongoose from 'mongoose';

export interface IUser {
  name: string;
  age: number;
}

// Define the User model
interface IUserDocument extends IUser, mongoose.Document{}

// Create the User schema
const userSchema = new mongoose.Schema<IUserDocument>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export const isUser = (obj: any): obj is IUser => {
  return obj && typeof obj.name === "string" && typeof obj.age === "number";
};

// Create the User model
const UserModel = mongoose.model<IUserDocument>('User', userSchema);

class UserCRUD {

  constructor(private connectionString: string) {
    // Initialize the mongoose connection using the provided connection string
    mongoose.connect(connectionString);

    // Set up event listeners for mongoose connection events (optional)
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Error connecting to MongoDB: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }

  // CRUD methods
  public async createUser(user: IUser): Promise<IUserDocument> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  public async getUsers(): Promise<IUserDocument[]> {
    return await UserModel.find();
  }

  public async getUserById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id);
  }

  public async updateUserById(id: string, user): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  public async deleteUserById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndDelete(id);
  }

  public closeConnection(): void {
    // Close the mongoose connection
    mongoose.connection.close();
  }
}

export default UserCRUD;