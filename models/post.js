const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = Schema({
  author: String,
  title: String,
  text: String,
  readable: Boolean,
  created_at: { type: Date, default: Date.now },
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
