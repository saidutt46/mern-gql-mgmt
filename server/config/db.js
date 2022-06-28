const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true })
      .then(() => console.log(`MongoDB Connected Successfully`.cyan.underline.bold))
      .catch((err) => console.log(err));
}

module.exports = connectDB;