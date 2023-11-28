const mongoose = require('mongoose');

module.exports = () => {

  try {
    mongoose.connect(process.env.DB_DEV)
      .then(() => {
        console.log('Connected to database ')
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      })
  } catch (error) {
    console.log(error)
  }
}