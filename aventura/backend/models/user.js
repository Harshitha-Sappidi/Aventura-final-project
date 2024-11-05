import mongoose from 'mongoose';

// Getting the schema from mongoose
const Schema = mongoose.Schema;

// Creating UserSchema
const UserSchema = new Schema({

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        zipcode: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            required: false
        },
        // To show whether user is online
        isActive: {
            type: Boolean
        },

        username: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        userImage: {
            type: String
        },
        refreshToken: {
            type: String
        },
        phone: {
            type: String,
            required: false
        }
    },
    {
        // To disable the versioning
        versionKey: false
    });

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;