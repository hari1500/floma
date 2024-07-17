const { Schema, model } = require('mongoose');

const documentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    collaborators: {
        type: Map,
        of: { type: String },
    },
});

module.exports = model('Document', documentSchema);
