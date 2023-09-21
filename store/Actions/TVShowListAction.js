import axios from "axios";
import { GetTVShowsList, adderrors } from "../Reducers/TVShowListReducer";

export const asyncTVShowList = (props) => async (dispatch, getState) => {
  const tvShowCategory = props
  
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowCategory}?api_key=223667d1239871fc4b6eeef8d0d6def8`
    );
    // console.log(data.results);
    dispatch(GetTVShowsList(data.results));
  } catch (error) {
    // console.log(error);
    dispatch(adderrors(error.response.data.status_message));
  }
};
