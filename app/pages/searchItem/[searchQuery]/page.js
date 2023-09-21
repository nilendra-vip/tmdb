"use client";

import style from "./style.module.css";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/loader";

const Page = (props) => {

  // Track searchQuery for search data
  const initialSearchQuery = props.params.searchQuery;
  // Decode searchQuery taken by params data
  const decodedInitialSearchQuery = decodeURIComponent(initialSearchQuery);
  // Track searchQuery for search data
  const [searchQuery, setSearchQuery] = useState(decodedInitialSearchQuery);

  // Save fetched search data
  const [searchData, setSearchData] = useState([]);

  // track searching data input 
  const [slug, setSlug] = useState(decodedInitialSearchQuery);
  const [searchResults, setSearchResults] = useState([]);

  // call useRouter and save it
  const router = useRouter();

  
  // Get search data 
  const GetSearchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=223667d1239871fc4b6eeef8d0d6def8&query=${searchQuery}`
      );
      console.log(data.results);
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };


  // code for debounce so that it will wait 3 seconds before fetching data from API
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  // debounce function and fetching data during user's typing so that it will fetch data only when user stops typing for 3 seconds before fetching data from API 
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=223667d1239871fc4b6eeef8d0d6def8&query=${searchTerm}`);
        console.log(data.results)
        setSearchResults(data.results); // Set the fetched data in state
      } catch (error) {
        console.error(error);
      }
    }, 300), // Debounce delay of 300ms
    []
  );

  //  function to handle input change 
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSlug(searchTerm);
    debouncedSearch(searchTerm); // Call debounced search function
  };

  // function to handle searchedItem result click 
  const handleSearchResultClick = (clickedItem) => {
    setSlug(clickedItem.original_title || clickedItem.original_name);
    const searchedItem = clickedItem.original_title || clickedItem.original_name;
    router.push(`./${searchedItem}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const searchedItem = e.target.searchItem.value;
    router.push(`./${searchedItem}`);
  };

  useEffect(() => {
    GetSearchData();
  }, []); // Include searchQuery as a dependency

  return (
    <>
      {searchData.length > 0 ? (
        <div className={`d-flex flex-column gap-5 ${style.searchBox}`}>
          <div className={style.searchTop}>
            <div
              className={`text-light d-flex flex-column justify-content-center pt-3 px-5 gap-5 ${style.searchListContainer}`}
            >
              <form
                onSubmit={submitHandler}
                className={`d-flex ${style.searchForm}`}
              >
                <div className="col-12">
                  <input
                    type="text"
                    className={`w-100 py-3 px-4 border border-0 ${style.searchInput}`}
                    placeholder="search for movie, tv show, person..."
                    name="searchItem"
                    value={slug}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <button
                    type="submit"
                    className={`text-light py-3 px-5  border border-0 ${style.searchButton}`}
                  >
                    Search
                  </button>
                </div>

                <div className={`list-group  ${style.searchingListItem}`}>
                  {searchResults.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={`list-group-item list-group-item-action`}
                        style={{cursor:"pointer"}}
                        onClick={() => handleSearchResultClick(item)}
                      >
                        {item.original_title || item.original_name}
                      </li>
                    );
                  })}
                </div>
              </form>
              <div>
                <h1 className={`${style.heading}`}>Related Search</h1>
              </div>
            </div>
          </div>

          <div className={`d-flex ${style.searchBottom}`}>
            {searchData.length > 0 ? (
              <div className={`${style.searchItemContainer}`}>
                {searchData.map((searchItem, index) => {
                  return (
                    <div
                      key={searchItem.id}
                      className={`overflow-hidden ${style.searchItem}`}
                    >
                      <div className={`rounded-4 ${style.showImageBox}`}>
                        <Link
                          href={`../details/${searchItem.media_type}/${searchItem.id}`}
                        >
                          <img
                            className={style.showImage}
                            src={
                              searchItem.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${
                                    searchItem.poster_path ||
                                    searchItem.profile_path
                                  }`
                                : `https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png`
                            }
                            alt=""
                          />
                        </Link>
                        <div className={`bg-dark rounded-circle text-light d-flex align-items-center justify-content-center pe-2 ${style.showScoreRate}`}>
                          <small style={{maxWidth:'3ch',paddingLeft:"5px", overflow:'hidden'}}>{searchItem.vote_average || searchItem.popularity }</small>
                        </div>
                      </div>

                      <div
                        className={`col  d-flex flex-column justify-content-start  px-2  ${style.showDets}`}
                      >
                        <p className={`h5 lh-1 ${style.showTitle}`}>
                          {searchItem.title || searchItem.original_name ? searchItem.title || searchItem.original_name : "No Title"}
                        </p>
                        <p className={`h5 lh-1 mt-2 ${style.showReleaseDate}`}>
                          {searchItem.release_date || searchItem.first_air_date ? searchItem.release_date || searchItem.first_air_date : "No Release Date"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Page;
