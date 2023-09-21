import axios from "axios";
import style from "./style.module.css";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const index = () => {
  const [slug, setSlug] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to hold fetched results

  const router = useRouter()

  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

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

  // console.log(searchResults)

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSlug(searchTerm);
    debouncedSearch(searchTerm); // Call debounced search function
  };

  const handleSearchResultClick = (clickedItem) => {
    setSlug(clickedItem.original_title || clickedItem.original_name);
    const searchedItem = clickedItem.original_title || clickedItem.original_name;
    router.push(`./pages/searchItem/${searchedItem}`);
  };

  const submitHandler = (e)=>{
    e.preventDefault();
    const searchedItem = e.target.searchItem.value ;
    router.push(`./pages/searchItem/${searchedItem}`)
  }

    
  return (
    <>
      <div
        className={`text-light d-flex flex-column justify-content-center px-5 gap-5 ${style.searchListContainer}`}
      >
        <div>
          <h1 className={`${style.heading}`}>Welcome.</h1>
          <h4 className={`${style.subHeading}`}>
            Millions of movies, TV shows and people to discover. Explore now.
          </h4>
        </div>
        <form
          onSubmit={submitHandler}
          className={`d-flex rounded-pill    ${style.searchForm}`}
        >
          <div className="col-12">
            <input
              type="text"
              className={`w-100 py-3 px-4 rounded-start  border border-0  ${style.searchInput}`}
              placeholder="search for movie, tv show, person..."
              onChange={handleInputChange}
              value={slug}
              name='searchItem'
            />
          </div>
          <div className="col">
            <button type="submit" className={` text-light py-3 px-5  border border-0 ${style.searchButton}`}>
              Search
            </button>
          </div>

          <div className={`list-group  ${style.searchingListItem}`}>
          {searchResults.map((item, index) => {
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
      </div>
    </>
  );
};

export default index;
