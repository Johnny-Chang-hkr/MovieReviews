import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import api from "../lib/axios"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
// -----------------------------Rate limiter effect------------------------
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching movies");
        console.log(error)
        if(error.response?.status === 429){
            setIsRateLimited(true)
        } else {
            toast.error("Failed to load movies")
        }
      } finally {
        setLoading(false)
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading movies... </div>}

        {movies.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} setMovies={setMovies}/> 
                ))}

            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
