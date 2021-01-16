import { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  email: String;
  password: String;
  name: String;
  status: boolean;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: true,
  },
});

const User: Model<IUser> = model("User", UserSchema);

export { User };
