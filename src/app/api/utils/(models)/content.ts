import { Schema, model, models } from "mongoose";
export enum contentType {
  ARRAY = "array",
  OBJECT = "object",
  STRING = "string",
}
const ContentSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true, collection: "content" }
);

const ContentModel = models?.content || model("content", ContentSchema);

export { ContentModel };
