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
    contentType: {
      type: String,
      enum: contentType,
      required: true,
    },
    endpoint: { type: Schema?.ObjectId, ref: "endpoints" },
  },
  { timestamps: true, collection: "content" }
);

const ContentModel = models?.content || model("content", ContentSchema);

export { ContentModel };
