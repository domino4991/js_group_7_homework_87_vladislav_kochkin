import {GET_POSTS_ERROR, GET_POSTS_SUCCESS, GET_SINGLE_POST_ERROR, GET_SINGLE_POST_SUCCESS} from "../actionTypes";
import {axiosApi} from "../../axiosApi";

const getPostsSuccess = data => ({type: GET_POSTS_SUCCESS, data});
const getPostsError = error => ({type: GET_POSTS_ERROR, error});
const getSinglePostSuccess = data => ({type: GET_SINGLE_POST_SUCCESS, data});
const getSinglePostError = error => ({type: GET_SINGLE_POST_ERROR, error});

export const getPosts = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/posts');
            dispatch(getPostsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getPostsError(e.response.data.error));
            } else {
                dispatch(getPostsError(e.message));
            }
        }
    };
};

export const getSinglePost = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/posts/${id}`);
            dispatch(getSinglePostSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getSinglePostError(e.response.data.error));
            } else {
                dispatch(getSinglePostError(e.message));
            }
        }
    }
}