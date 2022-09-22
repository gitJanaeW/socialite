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
        // password: {
        //     type: String,
        //     required: 'Password not inputted',
        //     match: [/^.{8,15}$/] // is between 8-15 chars
        // },
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
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    console.log('this.friends.length:', this.friends.length);
    return this.friends.length - 1;
})

const User = model('User', UserSchema);

module.exports = User;