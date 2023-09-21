import style from "./style.module.css";
import Loader from "@/components/Loader/loader";
import ListBoxContainer from "../ListBoxContaniner/index";
import { asyncTVShowList } from "@/store/Actions/TVShowListAction";
import { removeerrors } from "@/store/Reducers/TVShowListReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const index = (props) => {
  const dispatch = useDispatch();

  // Track active TV show
  const [activeTVShow, setActiveTVShow] = useState("airing_today");

  // Fetch Movie List Data
  const { tvShowList, errors } = useSelector(
    (state) => state.TVShowListReducer
  );
  // console.log(tvShowList);
  
  if (errors.length > 0) {
    const errorMessages = errors.map((e, i) => {
      toast.error(e);
      return e;
    });
    dispatch(removeerrors());
  }

  useEffect(() => {
    dispatch(asyncTVShowList(activeTVShow));
  }, [activeTVShow]);

  return (
    <>
      {tvShowList.length > 0 ? (
        <div>
          <div className={`mt-5 ${style.trendingMovieContainer}`}>
            <div
              className={`col d-flex align-items-center ps-3 gap-4  ${style.movieTop}`}
            >
              <h1>TV Show </h1>
              <div className="col d-flex gap-3 ">
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTVShow === "airing_today"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTVShow("airing_today")}
                >
                  Airing Today
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTVShow === "popular"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTVShow("popular")}
                >
                  Popular
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTVShow === "on_the_air"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTVShow("on_the_air")}
                >
                  On The Air
                </button>
                <button
                  className={`btn fs-5 border border-0 ${
                    activeTVShow === "top_rated"
                      ? "bg-primary text-light"
                      : "bg-primary-subtle"
                  }`}
                  onClick={() => setActiveTVShow("top_rated")}
                >
                  Top Rated
                </button>
              </div>
            </div>

            <ListBoxContainer listItems={tvShowList} category={"tv"} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default index;
