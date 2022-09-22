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
            trim: true,
            match: [/.+\@.+\..+/] // is email
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length - 1;
})

const User = model('User', UserSchema);

module.exports = User;