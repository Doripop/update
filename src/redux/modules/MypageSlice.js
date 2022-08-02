import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { instance } from "../../shard/axios"



const initialState = {
    MyLikeInfo: [],
    OwnerInfo: []

}


//마이페이지 내가적은 리뷰 조회
export const MyReviewLoad = createAsyncThunk(
    'MypageSlice/MyReviewLoad',
    async () => {
        try {
            const { data } = await instance.get("/api/user/posts")
            
            return data
        } catch (error) {
            
        }
    }
)

//마이페이지 내가적은 리뷰 좋아요 조회
export const MyLikeInfoLoad = createAsyncThunk(
    'MypageSlice/MyLikesInfoList',
    async (cafeid) => {
        if (localStorage.getItem("token")) {
            try {
                const { data } = await instance.get(`api/user/like-list`)
                
                return data;
            } catch (error) {
              
            }
        }

    }
)


//마이페이지 리뷰 포스트 삭제

export const MypageDeletePost = createAsyncThunk(
    'MypageSlice/MypageDeletePost',
    async (postid) => {
        try {
           
            const { data } = await instance.delete(`api/posts/${postid}`)
          
            return postid
        } catch (error) {
           
        }
    }
)


//마이페이지 댓글 달기
export const MyCreateComment = createAsyncThunk(
    'MypageSlice/MyCreateComment',
    async (contents) => {
        try {
         
            const { data } = await instance.post(`api/posts/${contents.postid}/comments`, { contents: contents.contents })
            // console.log(data)
            const comment = {
                contents: contents.contents,
                nickname: contents.nickname,
                profileimg: contents.profileimg,
                commentid: data.data.commentid
            }
            // contents.postid
            return { comment: comment, postid: contents.postid }
        } catch (error) {
           
        }
    }
)
// 마이페이지 댓글 수정
export const MypageModifyMyCommnet = createAsyncThunk(
    'MypageSlice/MypageModifyMyCommnet',
    async (CommentInfo) => {
        try {
            
            const { data } = await instance.patch(`api/comments/${CommentInfo.commentid}`, { contents: CommentInfo.contents })
            const ChangeComment = {
                commentid: CommentInfo.commentid,
                contents: CommentInfo.contents,
                nickname: CommentInfo.nickname,
                profileimg: CommentInfo.profileimg
            }
          

            return {
                comment: ChangeComment,
                postid: CommentInfo.postid
            }
        } catch (error) {
          
        }
    }
)

//마이페이지 댓글 삭제
export const MypageDeleteMyComment = createAsyncThunk(
    'MypageSlice/MypageDeleteMyComment',
    async (CommentId) => {

        try {
           
            const { data } = await instance.delete(`api/comments/${CommentId.commentid}`)
            return {
                commentid: CommentId.commentid,
                postid: CommentId.postid
            }
        } catch (error) {
            
        }
    }
)


//사장님 마이페이지 카페 홈정보 조회
export const OwnerCafeLoad = createAsyncThunk(
    'MypageSlice/OwnerCafeLoad',
    async () => {
        try {
            const { data } = await instance.get("api/owner/info")
            return data
        } catch (error) {
          
        }
    }
)

//사장님 마이페이지 베너 조회
export const OwnerCafeBenner = createAsyncThunk(
    'MypageSlice/OwnerCafeBenner',
    async (cafeid) => {
       
        try {
            const { data } = await instance.get(`api/cafes/${cafeid}`)
            return data
        } catch (error) {
          
        }
    }
)

//사장님 마이페이지 메뉴 조회
export const OwnerCafeMeunLoad = createAsyncThunk(
    'MypageSlice/OwnerCafeMeunLoad',
    async () => {
        try {
            const { data } = await instance.get("api/owner/menus")
           
            return data
        } catch (error) {
          
        }
    }
)

//사장님 홈정보 수정
export const ModifyOwnerCafe = createAsyncThunk(
    'MypageSlice/ModifyOwnerCafe',
    async (contents) => {
        try {
          
            const { data } = await instance.patch("api/owner/info", contents)
          
            window.alert("수정이 완료되었습니다.")
            return contents
        } catch (error) {
           
        }
    }
)

//사장님 메뉴 등록
export const AddCafeMenu = createAsyncThunk(
    'MypageSlice/AddCafeMenu',
    async (item) => {
        try {
          
            const { data } = await instance.post("api/owner/menus", item)
          
            const SendData = {
                menuid: data?.data.menuid,
                menuimg: data?.data.menuimg,
                menuname: data?.data.menuname,
                menuprice: data?.data.menuprice
            }
            return {
                Data: SendData,
                category: data?.data.category
            }
        } catch (error) {
         
        }
    }
)


//사장님 메뉴 삭제
export const DeleteCafeMenu = createAsyncThunk(
    'MypageSlice/DeleteCafeMenu',
    async (menuid) => {
        try {
           
            const { data } = await instance.delete(`api/owner/menus/${menuid.menuid}`)
           
            return menuid
        } catch (error) {
           
        }
    }
)
//사장님 메뉴 수정
export const ModifyCafeMenu = createAsyncThunk(
    'MypageSlice/ModifyCafeMenu',
    async (MenuInfo) => {
        try {
         
            const { data } = await instance.patch(`/api/owner/menus/${MenuInfo.menuid}`, {
                category: MenuInfo.category,
                menuname: MenuInfo.menuname,
                menuprice: MenuInfo.menuprice
            })

            const ChangeMenu = {
                category: MenuInfo.category,
                menuname: MenuInfo.menuname,
                menuprice: MenuInfo.menuprice,
                menuimg: MenuInfo.menuimg,
                menuid: MenuInfo.menuid
            }
            

            return {
                menu: ChangeMenu,
                menuid: MenuInfo.menuid
            }
        } catch (error) {
            
        }
    }
)


const MypageSlice = createSlice({
    name: "MypageSlice",
    initialState,
    reducers: {
        MyLikeListInfo: (state, action) => {
           
            // state.LikeInfo.push(action.payload)
            const Index = state.MyLikeInfo.findIndex((list) => {
                return list.postid === action.payload.postid
            })
          
            state.MyLikeInfo[Index] = action.payload
        },
        MyUnLikeListInfo: (state, action) => {
           
            const Index = state.MyLikeInfo.findIndex((list) => {
                return list.postid === action.payload.postid
            })
           
            state.MyLikeInfo[Index] = action.payload
        },
        MyLikeCountAdd: (state, action) => {

            const Index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload.postid
            })

            state.MyReview[Index].likecnt += 1
        },
        MyLikeCountMinus: (state, action) => {

            const Index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload.postid
            })

            state.MyReview[Index].likecnt -= 1
        },
    },
    extraReducers: {

        //마이페이지 리뷰 로드
        [MyReviewLoad.fulfilled]: (state, action) => {
            state.MyReview = action.payload.data
        },
        //마이페이지 리뷰 포스트 삭제
        [MypageDeletePost.fulfilled]: (state, action) => {
           
            const Index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload
            })
         
            state.MyReview = state.MyReview.filter((list, index) => {
                return Index !== index;
            })
        },

        [MyLikeInfoLoad.fulfilled]: (state, action) => {
            if (localStorage.getItem("token")) {
                state.MyLikeInfo = action.payload.data
            }
        },
        [MyCreateComment.fulfilled]: (state, action) => {
            const index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload.postid
            })
            state.MyReview[index].commentList.push(action.payload.comment)
        },
        [MypageModifyMyCommnet.fulfilled]: (state, action) => {
            const Index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload.postid
            })
            const CommentIndex = state.MyReview[Index].commentList.findIndex((List) => {
                return List.commentid === action.payload.comment.commentid
            })

            state.MyReview[Index].commentList[CommentIndex] = action.payload.comment
        },
        [MypageDeleteMyComment.fulfilled]: (state, action) => {
            const Index = state.MyReview.findIndex((List) => {
                return List.postid === action.payload.postid
            })
            const CommentIndex = state.MyReview[Index].commentList.findIndex((List) => {
                return List.commentid === action.payload.commentid
            })
            state.MyReview[Index].commentList = state.MyReview[Index].commentList.filter((list, index) => {
                return CommentIndex !== index;
            })
        },


        //사장님 정보
        [OwnerCafeLoad.fulfilled]: (state, action) => {
           
            state.OwnerInfo = action.payload.data
        },
        [OwnerCafeBenner.fulfilled]: (state, action) => {
          
            state.OwnerInfoBenner = action.payload.data
        },
        //사장님 홈 정보 수정
        [ModifyOwnerCafe.fulfilled]: (state, action) => {
           
            state.OwnerInfo = action.payload
        },
        //사장님 메뉴
        [OwnerCafeMeunLoad.fulfilled]: (state, action) => {
           
            state.OwnerMenuInfo = action.payload.data
        },
        //사장님 메뉴 추가
        [AddCafeMenu.fulfilled]: (state, action) => {
         
            state.OwnerMenuInfo[action.payload.category].push(action.payload.Data)
        },
        //사장님 메뉴 수정
        [ModifyCafeMenu.fulfilled]: (state, action) => {
          
            const type = action.payload.menu.category
            const Index = state.OwnerMenuInfo[type].findIndex((list) => {
                return list.menuid === action.payload.menuid
            })
         
            state.OwnerMenuInfo[type][Index] = action.payload.menu
        },
        //사장님 메뉴 삭제
        [DeleteCafeMenu.fulfilled]: (state, action) => {
        
            const type = action.payload.category
            state.OwnerMenuInfo[type] = state.OwnerMenuInfo[type].filter((list, i) => {
                return action.payload.menuid !== list.menuid
            })
        },
    }
}
)




export const { MyLikeListInfo, MyUnLikeListInfo, MyLikeCountAdd, MyLikeCountMinus } = MypageSlice.actions
export default MypageSlice.reducer