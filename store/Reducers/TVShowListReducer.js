import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    tvShowList: [],
    page: 1,
    errors: [],
}

export const tvShowListReducer = createSlice({

    name: 'tvShowList',
    initialState,
    reducers:{
       GetTVShowsList: (state, action) =>{
           state.tvShowList = action.payload;
       },
       adderrors: (state, action) =>{
           state.errors.push(action.payload);
       },
       removeerrors: (state, action) =>{
           state.errors = [];
       },
       changepage: (state, action) =>{
           state.page += action.payload;
       },
    },
});

export default tvShowListReducer.reducer
export const { GetTVShowsList, adderrors, changepage, removeerrors } = tvShowListReducer.actions;