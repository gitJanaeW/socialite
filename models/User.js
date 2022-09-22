const {Schema, model} = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: 'Username not provided.',
            trim: true
        },
        email: {
            type: String,
            required: 'Email not provided',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        id: false
    }
);

const User = model('User', UserSchema);

module.exports = User;