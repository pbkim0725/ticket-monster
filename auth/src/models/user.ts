import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttributes {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

//An Interface that describes the properties that user Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(userAttributes: UserAttributes): UserDoc;
}

//An interface that describes the properties that a user doc has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

userSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));
		this.set("password", hashed);
	}
	done();
});

userSchema.statics.build = (userAttributes: UserAttributes) => {
	return new User(userAttributes);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
