import style from "./style.module.css";
import Loader from "@/components/Loader/loader";
import ListBoxContainer from "../ListBoxContaniner/index";
import { asyncTrendingList } from "@/store/Actions/TrendingListAction";
import { removeerrors } from "@/store/Reducers/TrendingListReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const index = (props) => {
  const dispatch = useDispatch();

  // Track active Trending show
  const [activeTrending, setActiveTrending] = useState("all");

  // Fetch Trending List Data
  const { trendingList, errors } = useSelector((state) => state.TrendingListReducer);
  // console.log(trendingList)

  // console.log(errors);
  if (errors.length > 0) {
    const errorMessages = errors.map((e, i) => {
      toast.error(e);
      return e;
    });
    dispatch(removeerrors());
  }

  useEffect(() => {
    dispatch(asyncTrendingList(activeTrending));
  }, [activeTrending]);

  return (
    <>
      {trendingList.length > 0 ? (
        <div>
          <div className={`mt-5 ${style.trendingMovieContainer}`}>
            <div
              className={`col d-flex align-items-center ps-3 gap-4  ${style.movieTop}`}
            >
              <h1>Trending </h1>
              <div className="col d-flex gap-3 ">
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTrending === "all"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTrending("all")}
                >
                  All
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTrending === "movie"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTrending("movie")}
                >
                  Movie
                </button>
                
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTrending === "tv"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTrending("tv")}
                >
                  TV Show
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTrending === "person"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTrending("person")}
                >
                  People
                </button>
              </div>
            </div>

            <ListBoxContainer listItems={trendingList}  category={activeTrending === "tv" ? "tv" : "movie"}/>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default index;
