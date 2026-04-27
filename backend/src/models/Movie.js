import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of schema

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    name: { type: String, required: true },
    opinion: { type: String, required: true },
  },
  { timestamps: true }, // createdAt, updatedAt
);

const Movie = mongoose.model("Movie", movieSchema)

export default Movie