import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shard/axios";

const initialState = {
    ReviewCreate: [],
    ReviewLoad: [],
    ReviewModify: [],
    ReviewDelete: []
}

//카페리뷰 작성
export const MyReviewCreate = createAsyncThunk(
    'Review/MyReviewCreate',
    async (myReview) => {
        
        try {
            const { data } = await instance.post(`api/${myReview.cafeid}/posts`, myReview.formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
         
            return data
        } catch (error) {
        
            // window.alert(error) 
        }
    }
)

//마이리뷰 불러오기
export const MyReviewLoad = createAsyncThunk(
    'Review/MyReviewLoad',
    async (reviewInfo) => {
        try {
            const { data } = await instance.get("/api/user/posts")
        
            return data
        } catch (error) {
         
        }
    }
)

//마이리뷰 수정
export const MyReviewModify = createAsyncThunk(
    'Review/MyReviewModify',
    async (myRreview) => {
        try {
           
            const { data } = await instance.patch(`api/posts/${myRreview.postid}`, { contents: myRreview.contents })
            const ChangeReview = {
                contents: myRreview.contents,
                star: myRreview.star,
                hashtag: myRreview.hashtag
            }
           
            return {
                contents: ChangeReview,
                postid: myRreview.postid
            }
        } catch (error) {
         
        }
    }
)

//마이리뷰 삭제
export const MyReviewDelete = createAsyncThunk(
    'Review/MyReviewDelete',
    async (id) => {
        try {
           
            const { data } = await instance.delete(`api/posts/${id.postid}`)
          
            return {
                postid: id.postid
            }
        } catch (error) {
         
        }
    }
)

const review = createSlice({
    name: "Review",
    initialState,
    reducers: {
        ReviewCreate: (state, action) => {
            state.ReviewCreate = (action.payload)
        },

        ReviewLoad: (state, action) => {
            state.ReviewLoad = (action.payload)
        },

        ReviewModify: (state, action) => {
            state.ReviewModify = (action.payload)

        },

        ReviewDelete: (state, action) => {
            state.ReviewDelete = (action.payload)
        }
    },
    extraReducers: {
        [MyReviewCreate.fulfilled]: (state, action) => {
            state.ReviewCreate = action.payload
        },

        [MyReviewLoad.fulfilled]: (state, action) => {
            state.ReviewLoad = action.payload
        },

        [MyReviewModify.fulfilled]: (state, action) => {
            state.ReviewModify = action.payload
        },

        [MyReviewDelete.fulfilled]: (state, action) => {
            state.ReviewDelete = action.payload
        }
    }
})

export const { ReviewCreate, ReviewLoad, ReviewModify, ReviewDelete } = review.actions
export default review.reducer