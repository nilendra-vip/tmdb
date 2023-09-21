import axios from "axios";
import { adderrors, GetTrendingList } from "../Reducers/TrendingListReducer";
export const asyncTrendingList = (props) => async (dispatch, getState) => {
    const trendingCategory = props
    try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/${trendingCategory}/day?api_key=223667d1239871fc4b6eeef8d0d6def8`
        );
        // console.log(data.results);
        dispatch(GetTrendingList(data.results));
    } catch (error) {
        // console.log(error)
        dispatch(adderrors(error.response.data.status_message));        
    }
}