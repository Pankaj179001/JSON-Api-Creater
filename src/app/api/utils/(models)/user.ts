import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    endpoints: [{ type: Schema?.ObjectId, ref: "endpoints" }],
  },
  { timestamps: true, collection: "user" }
);
//user(guest ,admin,header-key)---->endpoints(description,end_types:predefined,custom,pagination:true/false)--->content(type:array/object/string,data)

const UserModel = models?.user || model("user", UserSchema);

export { UserModel };
