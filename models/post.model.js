const {Schema, model} = require('mongoose');

const Post = new Schema({
    content: {
        type: String,
        trim: true,
        maxlength: 200
    },
    img: String,
    type: {
        type: String,
        enum: ['REGULAR', 'PHOTO'],
        default: 'REGULAR'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

module.exports = model('Post', Post)






