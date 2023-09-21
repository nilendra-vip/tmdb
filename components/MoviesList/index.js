import style from "./style.module.css";
import Loader from "@/components/Loader/loader";
import ListBoxContainer from "../ListBoxContaniner/index";
import { asyncMoviesList } from "@/store/Actions/MoviesListAction";
import { removeerrors } from "@/store/Reducers/MoviesListReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const index = (props) => {
  const dispatch = useDispatch();

  // Track active moive
  const [activeMovie, setActiveMovie] = useState("now_playing");

  // Fetch Movie List Data
  const { moviesList, errors } = useSelector(
    (state) => state.MoviesListReducer
  );
// console.log(moviesList)

  // console.log(errors);
  if (errors.length > 0) {
    const errorMessages = errors.map((e, i) => {
      toast.error(e);
      return e;
    });
    dispatch(removeerrors());
  }

  useEffect(() => {
    dispatch(asyncMoviesList(activeMovie));
  }, [activeMovie]);

  return (
    <>
      {moviesList.length > 0 ? (
        <div>
          <div className={`mt-5 ${style.trendingMovieContainer}`}>
            <div
              className={`col d-flex align-items-center ps-3 gap-4  ${style.movieTop}`}
            >
              <h1>Movies </h1>
              <div className="col d-flex gap-3 ">
                <button
                  className={`btn fs-5 border border-0 ${
                    activeMovie === "now_playing"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveMovie("now_playing")}
                >
                  Now Playing
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeMovie === "popular"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveMovie("popular")}
                >
                  Popular
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeMovie === "top_rated"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveMovie("top_rated")}
                >
                  Top Rated
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeMovie === "upcoming"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveMovie("upcoming")}
                >
                  Upcoming
                </button>
              </div>
            </div>

            <ListBoxContainer listItems={moviesList} category={"movie"} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default index;
