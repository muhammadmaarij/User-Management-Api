import mongoose, { Schema, Model, Document } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface ISession {
  refreshToken: string;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  refreshToken: ISession[];
}

const Session = new Schema<ISession>({
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    refreshToken: {
      type: [Session],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

export default User;
