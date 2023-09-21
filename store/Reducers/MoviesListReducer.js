import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moviesList: [],
    page: 1,
    errors: [],
};

export const MoviesListReducer = createSlice({
    name: "MoviesList",
    initialState,
    reducers: {
        GetMoviesList: (state, action) => {
            state.moviesList = action.payload;
        },
        adderrors: (state, action) => {
            state.errors.push(action.payload);
        },
        removeerrors: (state, action) => {
            state.errors = [];
        },
        changepage: (state, action) => {
            state.page += action.payload;
        },
    },
});

export default MoviesListReducer.reducer;
export const { GetMoviesList, adderrors, changepage, removeerrors } = MoviesListReducer.actions;
