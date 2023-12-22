import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    ipAddress: {
        type: String,
        required: false,
      },
      userAgent: {
        type: String,
        required: false
      }
},{timestamps:true,collection:"user"});

const UserModel = models?.user || model('user', UserSchema);

export  {UserModel};     