import { Star, User, Quote, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";

const MovieCard = ({ movie, setMovies }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    // 1. Prevent the click from bubbling up to the parent div
    e.stopPropagation(); 
    
    // 2. Prevent default button behavior
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      // Use movie._id directly since it's available in the scope
      await axios.delete(`http://localhost:5001/api/movies/${movie._id}`);
      
      toast.success("Review deleted successfully");
      
      // Update the UI by filtering out the deleted movie
      setMovies((prev) => prev.filter((m) => m._id !== movie._id));
    } catch (error) {
      console.log("Failed to delete the movie", error);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="card bg-base-200 shadow-xl border border-base-content/5 cursor-pointer hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="card-body p-5">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors">
            {movie.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="badge badge-primary font-bold gap-1">
              <Star className="size-3 fill-current" />
              {movie.rating}
            </div>
            
            {/* Trash Icon Button */}
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-xs btn-square text-error hover:bg-error/20"
            >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>

        <p className="text-sm opacity-70 line-clamp-2 mt-1">
          {movie.description}
        </p>

        <div className="divider my-2"></div>

        <div className="flex gap-2">
          <Quote className="size-5 text-primary opacity-50 shrink-0" />
          <p className="italic text-sm text-base-content/90 line-clamp-3">
            {movie.opinion}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-xs opacity-60">
            <User className="size-4" />
            <span>{movie.name}</span>
          </div>
          <span className="text-xs text-base-content/60">
            {formatDate(new Date(movie.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;