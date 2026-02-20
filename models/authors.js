const mongoose = require("mongoose");
const Book = require("./books");
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const books = await Book.find({ author: this._id });
    if (books.length > 0) {
      return next(new Error("This author has books still"));
    }
  },
);

module.exports = mongoose.model("Author", authorSchema);
