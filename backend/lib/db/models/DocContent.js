const { Schema, model } = require('mongoose');

const docContentSchema = new Schema({
    docId: {
        type: String,
        required: true,
    },
    content: String,
});

module.exports = model('DocContent', docContentSchema);
