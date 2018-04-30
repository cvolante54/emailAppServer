const mongoose = require('mongoose');
const { Schema } = mongoose;

//Define our Model
const userSchema = new Schema({
	//makes the email unique, no two user with the same email
	googleId: String,
	facebookId: String,
	displayName: String,
	email: { type: String, unique: true, lowercase: true },
	password: String,
	credits: { type: Number, default: 0 }
});

//Create a model class
mongoose.model('users', userSchema);
