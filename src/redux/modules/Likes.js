import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { instance } from "../../shard/axios"



const initialState = {
    LikeInfo: []

}


export const LikeInfoLoad = createAsyncThunk(
    'Likes/LikesInfoList',
    async (cafeid) => {
        if (localStorage.getItem("token")) {
            try {
                const { data } = await instance.get(`api/${cafeid}/like-list`)
               
                return data;
            } catch (error) {
                // window.alert(error)
            }
        }

    }
)



const Likes = createSlice({
    name: "LikesSlice",
    initialState,
    reducers: {
        LikeList: (state, action) => {
            
           
            const Index = state.LikeInfo.findIndex((list) => {
                return list.postid === action.payload.postid
            })
           
            state.LikeInfo[Index] = action.payload
        },
        UnLikeList: (state, action) => {
           
            const Index = state.LikeInfo.findIndex((list) => {
                return list.postid === action.payload.postid
            })
        
            state.LikeInfo[Index] = action.payload
        }
    },
    extraReducers: {


        [LikeInfoLoad.fulfilled]: (state, action) => {
            if (localStorage.getItem("token")) {
                state.LikeInfo = action.payload.data
            }
        }


    }
}
)




export const { LikeList, UnLikeList } = Likes.actions
export default Likes.reducer