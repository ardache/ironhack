const {Schema, model} = require('mongoose');

const Comment = new Schema({
    content: {
        type: String,
        trim: true,
        maxlength: 200
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
});

module.exports = model('Comment', Comment)






