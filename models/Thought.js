const {Schema, model, Types} = require('mongoose');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            trim: true,
            required: 'Reply is not provided.'
        },
        username: {
            type: String,
            require: 'Username is not provided.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use Moment?
            // get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'thoughtText not provided',
            match: [/^.{1,280}$/] // is between 1-280 chars
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use Moment?
            // get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username not provided'
        },
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);