const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  comments: [String],
});

module.exports = model("Book", bookSchema);
