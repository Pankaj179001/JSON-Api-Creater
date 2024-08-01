import { Schema, model, models } from "mongoose";

export enum endpointType {
  PREDEFINED = "predefined",
  CUSTOM = "custom",
}

const EndpointSchema = new Schema(
  {
    title: {
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
    isDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
    data: {
      type: String,
      required: [true, "please enter the value for data"],
    },
    user: { type: Schema?.ObjectId, ref: "user", required: true },
  },
  { timestamps: true, collection: "endpoints" }
);

const EndpointModel = models?.endpoints || model("endpoints", EndpointSchema);

export { EndpointModel };
