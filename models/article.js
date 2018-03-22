var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  preview: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true,
    unique: true
  },

  source: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    required: true,
    default: 0
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Articles = mongoose.model("Articles", ArticlesSchema);

// Export the Articles model
module.exports = Articles;