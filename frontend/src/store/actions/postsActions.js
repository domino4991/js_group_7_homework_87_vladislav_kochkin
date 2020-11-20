import {
    GET_POSTS_ERROR,
    GET_POSTS_SUCCESS,
    GET_SINGLE_POST_ERROR,
    GET_SINGLE_POST_SUCCESS, POST_NEW_POST_ERROR,
    POST_NEW_POST_SUCCESS
} from "../actionTypes";
import {axiosApi} from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

const getPostsSuccess = data => ({type: GET_POSTS_SUCCESS, data});
const getPostsError = error => ({type: GET_POSTS_ERROR, error});
const getSinglePostSuccess = data => ({type: GET_SINGLE_POST_SUCCESS, data});
const getSinglePostError = error => ({type: GET_SINGLE_POST_ERROR, error});
const postNewPostSuccess = () => ({type: POST_NEW_POST_SUCCESS});
const postNewPostError = error => ({type: POST_NEW_POST_ERROR, error});

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
};

export const postNewPost = data => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };
        if(!getState().users.user) {
            dispatch(push('/login'));
        } else {
            try {
                const response = await axiosApi.post('/posts', data, {headers});
                toast.success(response.data.message);
                dispatch(postNewPostSuccess());
                setTimeout(() => {
                    dispatch(push('/'));
                }, 4000);
            } catch (e) {
                if(e.response && e.response.data) {
                    dispatch(postNewPostError(e.response.data));
                } else {
                    dispatch(postNewPostError(e.message));
                }
            }
        }
    };
}