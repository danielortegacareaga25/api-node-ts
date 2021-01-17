import { model, Schema, Model, Document } from "mongoose";
import { IPost } from "./posts";
import { IUser } from "./user";

interface IComment extends Document {
  content: String;
  creator: IUser;
  post: IPost;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment: Model<IComment> = model("Comment", CommentSchema);

export { Comment };
