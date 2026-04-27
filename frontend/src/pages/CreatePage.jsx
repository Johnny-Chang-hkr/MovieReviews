import { ArrowLeftIcon, StarIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

/**
 * CreatePage Component
 * Handles the creation of a movie review entry including the reviewer's name.
 */
const CreatePage = () => {
  // State initialized with the provided movie information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(9);
  const [name, setName] = useState("");
  const [opinion, setOpinion] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
    if (!title.trim() || !description.trim() || !opinion.trim() || !name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Sending movie data to the backend API
      await api.post("/movies", {
        title,
        description,
        rating,
        name,
        opinion,
      });

      toast.success("Movie review saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving movie:", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests! Please wait.", { icon: "💀" });
      } else {
        toast.error("Failed to save movie review");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Link back to the main library/home page */}
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Library
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Add Movie Review</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Movie Title Field */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Movie Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reviewer Name Field */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">Reviewer Name</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <UserIcon className="size-5 opacity-50" />
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Rating Field */}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-bold">Rating (1-10)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <StarIcon className="size-5 text-warning fill-warning" />
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="input input-bordered"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Movie Description/Plot Field */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold">Plot Summary</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Reviewer Opinion Field */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Detailed Opinion</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 border-primary"
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary px-8" disabled={loading}>
                    {loading ? "Processing..." : "Save Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;