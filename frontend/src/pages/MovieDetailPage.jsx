import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeftIcon, StarIcon, UserIcon, Quote, CalendarIcon, Loader2, SaveIcon, Edit3Icon, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Data States
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit Form States
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editOpinion, setEditOpinion] = useState("");

  // useEffect handles the initial fetch
  useEffect(() => {
    // Defining the function inside the effect prevents "flagged red" or hoisting errors
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movies/${id}`);
        const data = response.data;
        
        setMovie(data);
        setEditTitle(data.title);
        setEditDescription(data.description);
        setEditRating(data.rating);
        setEditOpinion(data.opinion);
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Could not find that movie review.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, navigate]); // Dependencies for the effect

  // PUT method to update the movie
  const handleUpdate = async () => {
    try {
      const updatedMovie = {
        title: editTitle,
        description: editDescription,
        rating: Number(editRating),
        opinion: editOpinion,
      };

      await api.put(`/movies/${id}`, updatedMovie);
      
      toast.success("Changes saved successfully!");
      setMovie({ ...movie, ...updatedMovie }); 
      setIsEditing(false); 
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to save changes.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 text-left">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="btn btn-ghost gap-2">
              <ArrowLeftIcon className="size-5" /> Back
            </Link>
            
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-primary gap-2">
                <Edit3Icon className="size-4" /> Edit Review
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="btn btn-ghost text-error">
                  <XIcon className="size-4" /> Cancel
                </button>
                <button onClick={handleUpdate} className="btn btn-primary gap-2">
                  <SaveIcon className="size-4" /> Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="card bg-base-100 shadow-2xl overflow-hidden">
            {/* Visual Header */}
            <div className="bg-primary p-8 text-primary-content">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input 
                      className="input input-bordered w-full text-2xl font-bold text-base-content" 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <h1 className="text-4xl font-black mb-2">{movie.title}</h1>
                  )}
                  <div className="flex items-center gap-4 mt-2 opacity-90">
                    <div className="flex items-center gap-1">
                      <UserIcon className="size-4" />
                      <span>Reviewed by {movie.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="size-4" />
                      <span>{formatDate(new Date(movie.createdAt))}</span>
                    </div>
                  </div>
                </div>

                <div className="badge badge-secondary badge-lg p-6 gap-2 text-xl font-bold shadow-lg">
                  <StarIcon className="size-6 fill-current" />
                  {isEditing ? (
                    <input 
                      type="number" 
                      className="w-16 bg-transparent text-center border-b-2 border-secondary-content focus:outline-none" 
                      value={editRating} 
                      onChange={(e) => setEditRating(e.target.value)}
                    />
                  ) : movie.rating}
                </div>
              </div>
            </div>

            <div className="card-body p-8 gap-8">
              {/* Synopsis Section */}
              <section>
                <h2 className="text-sm uppercase tracking-widest font-bold text-primary mb-3">Synopsis</h2>
                {isEditing ? (
                  <textarea 
                    className="textarea textarea-bordered w-full h-32 text-base-content" 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  <p className="text-lg leading-relaxed text-base-content/80">{movie.description}</p>
                )}
              </section>

              <div className="divider"></div>

              {/* User Opinion Section */}
              <section>
                <h2 className="text-sm uppercase tracking-widest font-bold text-primary mb-4">Review Detail</h2>
                {isEditing ? (
                  <textarea 
                    className="textarea textarea-bordered border-primary w-full h-32 text-base-content" 
                    value={editOpinion} 
                    onChange={(e) => setEditOpinion(e.target.value)}
                  />
                ) : (
                  <div className="relative p-6 bg-base-200 rounded-2xl italic text-xl text-base-content/90 border-l-4 border-primary">
                    <Quote className="size-8 text-primary opacity-20 absolute top-4 right-4" />
                    <p>"{movie.opinion}"</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;

