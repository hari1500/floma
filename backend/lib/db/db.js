const mongoose = require('mongoose');

const init = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        return error;
    }
    console.log("DB connected");
    return null;
}

const close = async () => {
    await mongoose.close();
}

module.exports = {
    init,
    close,
};
