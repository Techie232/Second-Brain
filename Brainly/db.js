const mongoose = require('mongoose');

const dbConnection = async () => {
   try {
      await mongoose.connect(process.env.MONDODB_URL)
      console.log('DB connected');
   } catch (error) {
      console.log('Db NOT connected');
      console.log(error.message);
   }
}

const userSchmea = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   }
})

const User = mongoose.model('User', userSchmea);

const contentSchmea = new mongoose.Schema({
   title: String,
   link: String,
   type: String,
   tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
   userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
})

const tagSchmea = new mongoose.Schema({
   title: String,
})

const Tag = mongoose.model('Tag', tagSchmea);

const linkSchmea = new mongoose.Schema({
   hash: String,
   userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
   }
})

const Link = mongoose.model('Link', linkSchmea);

const Content = mongoose.model('Content', contentSchmea);

module.exports = { dbConnection, User, Content, Tag, Link };