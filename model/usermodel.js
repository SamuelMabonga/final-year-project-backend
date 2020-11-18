// import mongoose
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create userSchema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        // required: true,
        max: 20,
        index: true
    },
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    village: {
        type: String 
    },
    role: [
        {
            type: Schema.Types.ObjectId,
            ref: 'roles',
        },
    ],
    interests: [
        {
            farmer: {
                type: Schema.Types.ObjectId,
                ref: 'farmers',
            },
            relationship: {
                type: String
            }
        },
    ],
    image: {
        type: String
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tasks: [
        {
            taskId: {
                type: Schema.Types.ObjectId,
                ref: 'tasks'
            }
        },
    ],
    isActive: {
        type: Boolean
    },
    isAdmin: {
        type: Boolean
    },
    isOwner: {
        type: Boolean
    },
}, {
    timestamps: true
});

// Export model
module.exports = mongoose.model('users', userSchema);
