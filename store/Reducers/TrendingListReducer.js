const { createSlice } = require("@reduxjs/toolkit")

const initialState =({
    trendingList:[],
    page:1,
    errors:[],
})

export const TrendingListReducer = createSlice({
    name:'trendingList',
    initialState,
    reducers:{
        GetTrendingList:(state,action)=>{
            state.trendingList = action.payload;
        },
        adderrors:(state,action)=>{
            state.errors.push(action.payload);
        },
        removeerrors:(state,action)=>{
            state.errors = [];
        },
        changepage:(state,action)=>{
            state.page += action.payload;
        }
    }
})

export default TrendingListReducer.reducer;
export const {GetTrendingList,adderrors,changepage,removeerrors} = TrendingListReducer.actions;