import express from "express";
import {
  createAMovie,
  deleteAMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.post("/", createAMovie);

router.put("/:id", updateMovie);

router.delete("/:id", deleteAMovie);

export default router;
