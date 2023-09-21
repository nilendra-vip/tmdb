import { configureStore } from "@reduxjs/toolkit";
import MoviesListReducer from "@/store/Reducers/MoviesListReducer";
import TVShowListReducer from '@/store/Reducers/TVShowListReducer';
import TrendingListReducer from '@/store/Reducers/TrendingListReducer';
export const store = configureStore({
    reducer: {
        MoviesListReducer,
        TVShowListReducer,
        TrendingListReducer,
    },
});
