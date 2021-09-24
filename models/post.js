const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnail: String,
    title: String,
    text: String,
    readable: Boolean,
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created_at).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
