const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please provide a category for the question"],
      maxLength: [30, "category can not exceed 30 characters"],
    },
    question: {
      type: String,
      required: [true, "Please provide a question"],
      maxLength: [150, "question can not exceed 150 characters"],
    },
    answer: {
      type: String,
      unique: true,
      required: [true, "Please provide an asnwer for the question"],
      maxLength: [500, "answer can not exceed 500 characters"],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("FAQ", faqSchema);
