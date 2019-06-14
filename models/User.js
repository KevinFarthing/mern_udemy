const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});
// ^^^is this magic?
// looks like mongoose might automatically assume that anything called User must be related to userSchema
// yep, mongoose.model('NAME') HAS to check if there's a NAMESchema const.

mongoose.model('users', userSchema);