import {GET_POSTS_ERROR, GET_POSTS_SUCCESS, GET_SINGLE_POST_ERROR, GET_SINGLE_POST_SUCCESS} from "../actionTypes";

const initialState = {
    posts: null,
    error: null,
    post: null
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.data,
                error: null
            };
        case GET_SINGLE_POST_SUCCESS:
            return {
                ...state,
                post: action.data,
                error: null
            };
        case GET_POSTS_ERROR:
        case GET_SINGLE_POST_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};