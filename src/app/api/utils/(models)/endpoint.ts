import { Schema, model, models } from "mongoose";

export enum endpointType {
  PREDEFINED = "predefined",
  CUSTOM = "custom",
}

const EndpointSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    endpointType: {
      type: String,
      enum: endpointType,
      required: true,
    },
    user: { type: Schema?.ObjectId, ref: "user" },
  },
  { timestamps: true, collection: "endpoints" }
);

const EndpointModel = models?.endpoints || model("endpoints", EndpointSchema);

export { EndpointModel };
