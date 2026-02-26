const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one ingredient is required",
      },
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      trim: true,
    },
    time: {
      type: Number,
      required: [true, "Time is required"],
      min: [1, "Time must be at least 1 minute"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine is required"],
      trim: true,
      maxlength: [60, "Cuisine cannot exceed 60 characters"],
    },
    servings: {
      type: Number,
      required: [true, "Servings is required"],
      min: [1, "Servings must be at least 1"],
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Recipe", recipeSchema);
