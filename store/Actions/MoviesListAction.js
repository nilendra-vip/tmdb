import axios from "axios";
import { adderrors, GetMoviesList } from "../Reducers/MoviesListReducer";

export const asyncMoviesList = (props) => async (dispatch, getState) => {
    const movieCategory = props

    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieCategory}?api_key=223667d1239871fc4b6eeef8d0d6def8`
        );
        // console.log(data.results);
        dispatch(GetMoviesList(data.results));
    } catch (error) {
        // console.log(error)
        dispatch(adderrors(error.response.data.status_message));
    }
};
