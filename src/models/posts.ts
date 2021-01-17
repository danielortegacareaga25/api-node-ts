import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "./user";

export interface IPost extends Document {
  title: String;
  content: String;
  creator: IUser;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Post: Model<IPost> = model("Post", PostSchema);

export { Post };
