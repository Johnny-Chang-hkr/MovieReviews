import Movie from "../models/Movie.js";

//-----------------------Get All------------------------------
export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().sort({createdAt:-1});

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error in getAllMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//-------------------Get movie by ID----------------------------
export async function getMovieById(req,res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).json({ message: "Movie not found!" });
    res.json(movie)
  } catch (error) {
    console.error("Error in updateMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//-------------------------Create-------------------------------

export async function createAMovie(req, res) {
  try {
    const { title, description, rating, name, opinion } = req.body;
    const movie = new Movie({ title, description, rating, name, opinion });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error in createMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//-------------------------Update--------------------------------
export async function updateMovie(req, res) {
  try {
    const { title, description, rating, name, opinion } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, rating, name, opinion },
      { new: true },
    );
    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found!" });
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error in updateMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//-------------------------Delete--------------------------------
export async function deleteAMovie(req, res) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found!" });
    res.json({ message: "Movie deleted successfully!" });
  } catch (error) {
    console.error("Error in updateMovie controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
