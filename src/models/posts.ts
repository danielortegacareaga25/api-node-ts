import { model, Schema, Model, Document } from "mongoose";

interface IPost extends Document {
  title: String;
  content: String;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Post: Model<IPost> = model("Post", PostSchema);

export { Post };
