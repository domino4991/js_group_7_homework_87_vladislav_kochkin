import {
    GET_POST_COMMENTS_ERROR,
    GET_POST_COMMENTS_SUCCESS,
    POST_NEW_COMMENT_ERROR,
    POST_NEW_COMMENT_SUCCESS
} from "../actionTypes";

const initialState = {
    comments: null,
    error: null
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.data,
            };
        case GET_POST_COMMENTS_ERROR:
            return {
                ...state,
                error: action.error,
                comments: null
            };
        case POST_NEW_COMMENT_SUCCESS:
            return {
                ...state,
                error: null
            };
        case POST_NEW_COMMENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};