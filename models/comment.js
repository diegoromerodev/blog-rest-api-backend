const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CommentSchema = Schema({
  author: String,
  text: String,
  created_at: { type: Date, default: Date.now },
});

CommentSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
