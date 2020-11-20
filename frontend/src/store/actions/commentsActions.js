import {
    GET_POST_COMMENTS_ERROR,
    GET_POST_COMMENTS_SUCCESS,
    POST_NEW_COMMENT_ERROR,
    POST_NEW_COMMENT_SUCCESS
} from "../actionTypes";
import {axiosApi} from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

const getPostCommentsSuccess = data => ({type: GET_POST_COMMENTS_SUCCESS, data});
const getPostCommentsError = error => ({type: GET_POST_COMMENTS_ERROR, error});
const postNewCommentSuccess = () => ({type: POST_NEW_COMMENT_SUCCESS});
const postNewCommentError = error => ({type: POST_NEW_COMMENT_ERROR, error});

export const getPostComments = postId => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/comments/${postId}`);
            dispatch(getPostCommentsSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getPostCommentsError(e.response.data.error));
            } else {
                dispatch(getPostCommentsError(e.message));
            }
        }
    };
};

export const postNewComment = data => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };
        if(!getState().users.user) {
            dispatch(push('/login'));
        } else {
            try {
                const response = await axiosApi.post('/comments', data, {headers});
                toast.success(response.data.message);
                dispatch(postNewCommentSuccess());
                dispatch(getPostComments(data.post));
            } catch (e) {
                if(e.response && e.response.data) {
                    dispatch(postNewCommentError(e.response.data));
                } else {
                    dispatch(postNewCommentError(e.message));
                }
            }
        }
    };
};