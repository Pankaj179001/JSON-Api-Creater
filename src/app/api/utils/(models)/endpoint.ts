import { Schema, model, models } from "mongoose";

export enum endpointType {
  PREDEFINED = "predefined",
  CUSTOM = "custom",
}

const EndpointSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    pagination: {
      type: Boolean,
      required: false,
      default: false,
    },
    endpointType: {
      type: String,
      enum: endpointType,
      required: true,
    },
    user: { type: Schema?.ObjectId, ref: "user" },
    content: { type: Schema?.ObjectId, ref: "content" },
  },
  { timestamps: true, collection: "endpoints" }
);

const EndpointModel = models?.endpoints || model("endpoints", EndpointSchema);

export { EndpointModel };
